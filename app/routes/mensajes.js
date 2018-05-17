import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),
	session: service(),

	beforeModel() {
		console.log('Entro', "beforeModel",(new Date).getMinutes(), (new Date).getSeconds());
		this.controllerFor('mensajes').set('Admin',this.modelFor('application').get('role') == 'Admin');
		this.controllerFor('mensajes').set('error',false);
	},

	model() {
		console.log('Entro', "Model",(new Date).getMinutes(), (new Date).getSeconds());
		return this.store.findAll('message')
	},
});
