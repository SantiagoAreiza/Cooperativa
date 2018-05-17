import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),
	session: service(),

	beforeModel(){
		console.log('Entro', "beforeModel","application",(new Date).getMinutes(), (new Date).getSeconds());
		return this.get('session').fetch().catch(()=>{
				this.transitionTo('iniciar-sesion');
			});
	},

	model(){
		return this.store.findRecord('user', this.get('session').get('currentUser').uid);
	}
});
