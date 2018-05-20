import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),
	
	beforeModel() {
		if(this.get('autenticacion').getUsuario().get('role') != 'Admin'){
			this.transitionTo('mensajes');
		}
		else{
			this.controllerFor('historial-cuotas-socios').set('seeByMonth', false);
			this.controllerFor('historial-cuotas-socios').set('seeByPartner', false);
			this.controllerFor('historial-cuotas-socios').set('table', false);
		}
	},
});
