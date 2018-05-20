import Controller from '@ember/controller';
import { set, get } from '@ember/object';

function createMonthFee() {
	return {
		'administracion':0,
		'abono':0,
		'interes':0,
		'multa':0,
		'mes':null
	};
}

function createUserFee() {
	return {
		'administracion':0,
		'abono':0,
		'interes':0,
		'multa':0,
		'nombreSocio': null
	};
}

export default Controller.extend({
	error: false,
	errorMessage: null,
	seeByMonth: false,
	seeByPartner: false,
	table: false,

	actions: {
		verMes() {
			this.set('error', false);
			this.set('seeByMonth', true);
			this.set('seeByPartner', false);
			this.set('table', true);
			this.store.findAll('fee').then((cuotas)=>{
				var meses = [];
				for(var i=0; i<12; i++){
					meses[i] = createMonthFee();
					if(i == 0){
						meses[i].mes = 'Enero';
					}
					else if(i == 1){
						meses[i].mes = 'Febrero';
					}
					else if(i == 2){
						meses[i].mes = 'Marzo';
					}
					else if(i == 3){
						meses[i].mes = 'Abril';
					}
					else if(i == 4){
						meses[i].mes = 'Mayo';
					}
					else if(i == 5){
						meses[i].mes = 'Junio';
					}
					else if(i == 6){
						meses[i].mes = 'Julio';
					}
					else if(i == 7){
						meses[i].mes = 'Agosto';
					}
					else if(i == 8){
						meses[i].mes = 'Septiembre';
					}
					else if(i == 9){
						meses[i].mes = 'Octubre';
					}
					else if(i == 10){
						meses[i].mes = 'Noviembre';
					}
					else{
						meses[i].mes = 'Diciembre';
					}
				}
				cuotas.forEach((cuota)=>{
					meses[cuota.get('date').split('/')[1] - 1].administracion = meses[cuota.get('date').split('/')[1] - 1].administracion + cuota.get('administration');
					meses[cuota.get('date').split('/')[1] - 1].abono = meses[cuota.get('date').split('/')[1] - 1].abono + cuota.get('payment');
					meses[cuota.get('date').split('/')[1] - 1].interes = meses[cuota.get('date').split('/')[1] - 1].interes + cuota.get('interest');
					meses[cuota.get('date').split('/')[1] - 1].multa = meses[cuota.get('date').split('/')[1] - 1].multa + cuota.get('fine');
				})
				this.set('model', meses);
			});
		},
		verSocios() {
			this.set('error', false);
			this.set('seeByMonth', false);
			this.set('seeByPartner', true);
			this.set('table', true);
			this.store.query('user',{orderBy: 'role', equalTo:'Socio'}).then((socios)=>{
				var cuotasUsuario = [];
				var indexUsuario = {};
				var i = 0;
				socios.forEach((socio)=>{
					cuotasUsuario[i] = createUserFee();
					cuotasUsuario[i].nombreSocio = socio.get('name');
					indexUsuario[socio.get('name')] = i;
					i++;
				});
				socios.forEach((socio)=>{
					socio.get('loans').then((prestamos)=>{
						if(prestamos.length > 0){
							prestamos.forEach((prestamo)=>{
								prestamo.get('fees').then((cuotas)=>{
									if(cuotas.length > 0){
										cuotas.forEach((cuota)=>{
											set(cuotasUsuario[indexUsuario[socio.get('name')]], 'administracion', cuota.get('administration') + get(cuotasUsuario[indexUsuario[socio.get('name')]], 'administracion'));
											set(cuotasUsuario[indexUsuario[socio.get('name')]], 'abono', cuota.get('payment') + get(cuotasUsuario[indexUsuario[socio.get('name')]], 'abono'));
											set(cuotasUsuario[indexUsuario[socio.get('name')]], 'interes', cuota.get('interest') + get(cuotasUsuario[indexUsuario[socio.get('name')]], 'interes'));
											set(cuotasUsuario[indexUsuario[socio.get('name')]], 'multa', cuota.get('fine') + get(cuotasUsuario[indexUsuario[socio.get('name')]], 'multa'));
										});
									}
								});
							});
						}
					});
				});
				this.set('model', cuotasUsuario);
			});
		}
	}
});
