import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),

  beforeModel() {
    return this.get('session').fetch().catch(()=>{});
  },

  afterModel(){
    if(this.get('session').get('isAuthenticated')){
      this.transitionTo('mensajes');
      this.store.findRecord('usuario', this.get('session').get('currentUser').uid)
				.then((user)=>{
					this.controllerFor('mensajes').set('Admin',user.get('rol') == 'Admin');
				});
		}
  }

});
