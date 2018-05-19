import Controller from '@ember/controller';

function createMonthFee() {
	return {
		'administracion':0,
		'abono':0,
		'interes':0,
		'multa':0,
		'mes':null,
	};
}

export default Controller.extend({
	error: false,
	errorMessage: null,
	seeByMonth: false,
	seeByPartner: false,

	actions: {
		verMes() {
			this.set('error', false);
			this.set('seeByMonth', true);
			this.set('seeByPartner', false);
			this.set('error', true);
			this.set('errorMessage', "Interfaz Por Mes");
			var meses = this.store.findAll('fee').then((cuotas)=>{
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
				return meses;
			});
		},
		verSocios() {
			this.set('error', false);
			this.set('seeByMonth', false);
			this.set('seeByPartner', true);
			this.set('error', true);
			this.set('errorMessage', "Interfaz Por Socios");
		}
	}
});
