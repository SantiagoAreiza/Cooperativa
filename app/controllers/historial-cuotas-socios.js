import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	error: false,
	errorMessage: null,
	firebaseApp: service(),
	seeByMonth: false,
	seeByPartner: false,

	actions: {
		verMes() {
			this.set('error', false);
			this.set('seeByMonth', true);
			this.set('seeByPartner', false);
			this.set('error', true);
			this.set('errorMessage', "Interfaz Por Mes");
			var march = "03";
			var feesMarch = new Array();
			this.store.findAll('fee').forEach((cuota)=>{
				if(cuota.get('date').split("/")[1] == march){
					feesMarch = feesMarch.concat(cuota);
				}
				return this.set('model', feesMarch);
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
