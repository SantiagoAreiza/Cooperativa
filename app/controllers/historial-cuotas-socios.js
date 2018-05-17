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
