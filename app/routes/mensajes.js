import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),
	session: service(),
	beforeModel() {
		if(!this.get('session').get('isAuthenticated')){
			return this.get('session').fetch()
			.then(()=>{
				this.store.findRecord('user', this.get('session').get('currentUser').uid)
					.then((user)=>{
						this.get('autenticacion').setRol(user.get('role'));
					})            
			}).catch(()=>{this.transitionTo('iniciar-sesion');});
		}
	},

	model() {
		return this.store.findAll('message')
	},

	afterModel(){
		if(this.get('session').get('isAuthenticated')){
			this.controllerFor('mensajes').set('Admin',this.get('autenticacion').getRol() == 'Admin');
		}else{
			this.transitionTo('iniciar-sesion');
		}
	},

});
