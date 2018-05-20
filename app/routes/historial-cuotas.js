import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),

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
							'errorMessage': 'No ha pagado ninguna cuota'
						}
			}else{
				return prestamoCorrecto.get('fees').then((cuotas)=>{
					var cuotasTemporales = []
					cuotas.forEach((cuota) => {
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
						return {
							'error': true,
							'errorMessage': 'No ha pagado ninguna cuota'
						}
					}else{
						cuotasTemporales.sort(function(a,b){
						return new Date(a.date.split('/')[2], a.date.split('/')[1], a.date.split('/')[0]) - 
							new Date(b.date.split('/')[2], b.date.split('/')[1], b.date.split('/')[0])
						});
						return cuotasTemporales;
					}
			});
			}
		});
	},
});
