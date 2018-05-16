import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	session: service(),
	autenticacion: service(),

  beforeModel() {
    return this.get('session').fetch()
			.then(()=>{
				this.store.findRecord('user', this.get('session').get('currentUser').uid)
					.then(()=>{
            this.transitionTo('mensajes');
					})
			}).catch(()=>{});
	},

});
