import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),
	session: service(),
	beforeModel: function() {
		return this.get('session').fetch()
			.then(()=>{
				this.store.findRecord('usuario', this.get('session').get('currentUser').uid)
					.then((user)=>{
						this.get('autenticacion').setRol(user.get('rol'));
					})            
			}).catch(()=>{this.transitionTo('iniciar-sesion');});
	},

	model() {
		return this.store.findAll('mensaje')
	},

	afterModel(){
		if(this.get('session').get('isAuthenticated')){
			this.controllerFor('mensajes').set('Admin',this.get('autenticacion').getRol() == 'Admin');
		}else{
			this.transitionTo('iniciar-sesion');
		}
	},

});
