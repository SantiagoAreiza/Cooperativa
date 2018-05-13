import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	session:service(),

	beforeModel(){
		return this.get('session').fetch()
		.then(()=>{
			this.store.findRecord('usuario', this.get('session').get('currentUser').uid)
				.then((user)=>{
					this.controllerFor('mensajes').set('Admin',user.get('rol') == 'Admin');
				})            
		}).catch(()=>{this.transitionTo('iniciar-sesion');});
	},

	model() {
		return this.store.findAll('mensaje')
	},
});
