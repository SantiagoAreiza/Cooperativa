import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),

	calcularProximasCuotas(valorPrestamo, ultimaCuota, valorPorPagar){
		var proximasCuotas = [{'faltaPagar': valorPorPagar,
														'Abono': ultimaCuota.payment,
														'Interes': ultimaCuota.interest, 
														'Administracion': ultimaCuota.administration,
														'Multa': ultimaCuota.fine,
														'Fecha': ultimaCuota.date,
														'Total': ultimaCuota.payment + ultimaCuota.interest + ultimaCuota.administration + ultimaCuota.fine,
														'Clase': 'primeraCuota' }]
		var indiceUltimaCuota = proximasCuotas.length - 1;
		while(proximasCuotas[indiceUltimaCuota].faltaPagar - (valorPrestamo*0.12) > 0){
			var siguienteMes = Number(proximasCuotas[indiceUltimaCuota].Fecha.split('/')[1]) + 1;
			var siguienteFecha = proximasCuotas[indiceUltimaCuota].Fecha.split('/')[0] + '/' + siguienteMes + '/'
														+ proximasCuotas[indiceUltimaCuota].Fecha.split('/')[2];
			var proximaCuota = {'faltaPagar': proximasCuotas[indiceUltimaCuota].faltaPagar - (valorPrestamo*0.12),
													'Abono': proximasCuotas[indiceUltimaCuota].faltaPagar*0.12,
													'Interes': proximasCuotas[indiceUltimaCuota].faltaPagar*0.02,
													'Administracion': 0,
													'Multa': 0,
													'Fecha': siguienteFecha,
													'Total': proximasCuotas[indiceUltimaCuota].faltaPagar*0.12 + proximasCuotas[indiceUltimaCuota].faltaPagar*0.02}
			proximasCuotas = proximasCuotas.concat(proximaCuota);
			indiceUltimaCuota = indiceUltimaCuota + 1;
		}

		//Los numeros se cambian a formato de moneda
		proximasCuotas.forEach((cuota)=>{
			cuota.faltaPagar = '$' + Number(cuota.faltaPagar).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			cuota.Abono = '$' + Number(cuota.Abono).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			cuota.Interes = '$' + Number(cuota.Interes).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			cuota.Administracion = '$' + Number(cuota.Administracion).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			cuota.Multa = '$' + Number(cuota.Multa).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			cuota.Total = '$' + Number(cuota.Total).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		})
		return proximasCuotas;
	},

	beforeModel() {
		if(this.get('autenticacion').getUsuario().get('role') == 'Admin'){
			this.transitionTo('mensajes');
		}
	},

	model(){
		var usuario = this.get('autenticacion').getUsuario();
		return usuario.get('loans').then((prestamos)=>{
			var prestamoCorrecto = null;
			prestamos.forEach((prestamo) => {
				if(prestamo.get('state')){
					prestamoCorrecto = prestamo;
				}
			});
			if(prestamoCorrecto == null){
				return {
							'error': true,
							'errorMessage': 'No tienes deudas en este momento'
						}
			}else{
				return prestamoCorrecto.get('fees').then((cuotas)=>{
					var cuotasTemporales = []
					var valorPrestamo = prestamoCorrecto.get('value');
					var valorPorPagar = valorPrestamo;
					cuotas.forEach((cuota) => {
						valorPorPagar = valorPorPagar - cuota.get('payment'); 
						var nuevaCuota = {
							payment: cuota.get('payment'),
							interest: cuota.get('interest'),
							fine: cuota.get('fine'),
							administration: cuota.get('administration'),
							date: cuota.get('date'),
						};
						cuotasTemporales = cuotasTemporales.concat(nuevaCuota);
					})
					if(cuotasTemporales.length == 0){
						var fechaActual = new Date();
						var cuota = {
							payment: 0,
							interest: 0,
							fine: 0,
							administration: 0,
							Total: "0",
							date: fechaActual.getDate().toString() + '/' + (fechaActual.getMonth() + 1).toString() + '/' + fechaActual.getFullYear().toString(),
						}
						return this.calcularProximasCuotas(valorPrestamo, cuota, valorPorPagar);
					}else{
						cuotasTemporales.sort(function(a,b){
						return new Date(b.date.split('/')[2], b.date.split('/')[1], b.date.split('/')[0]) - 
							new Date(a.date.split('/')[2], a.date.split('/')[1], a.date.split('/')[0])
						});
						return this.calcularProximasCuotas(valorPrestamo, cuotasTemporales[0], valorPorPagar);
					}
			});
			}
		});
	},
});
