import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	session: service(),
	autenticacion: service(),

	beforeModel(){
		if(!this.get('session').get('isAuthenticated')){
			this.transitionTo('iniciar-sesion');
		}
		this.controllerFor('mensajes').set('Admin',this.get('autenticacion').getRol() == 'Admin');
	}, 

	model() {
		return this.store.findAll('mensaje')
	},
});
