import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),
	session: service(),

	beforeModel() {
		this.controllerFor('mensajes').set('Admin',this.get('autenticacion').getUsuario().get('role') == 'Admin');
		this.controllerFor('mensajes').set('error',false);
	},

	model() {
		return this.store.findAll('message')
	},
});
