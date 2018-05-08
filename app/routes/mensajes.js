import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),
	session:service(),

	model() {
		return this.store.findAll('mensaje')
	},

	afterModel(){
		if(!this.get('session').get('isAuthenticated')){
			this.transitionTo('iniciar-sesion');
		}
		this.controllerFor('mensajes').set('Admin',this.get('autenticacion').getRol() == 'Admin');
	}
});
