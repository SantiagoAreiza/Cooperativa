import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	session: service(),
	autenticacion: service(),

  beforeModel() {
		if(this.get('autenticacion').getUsuario() != null){
			this.transitionTo('mensajes');
		}
	},

});
