import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  autenticacion: service(),

  beforeModel() {
    return this.get('session').fetch()
			.then(()=>{
				this.store.findRecord('usuario', this.get('session').get('currentUser').uid)
					.then((user)=>{
						this.get('autenticacion').setRol(user.get('rol'));
					})            
			}).catch(()=>{});
  },

  afterModel(){
    if(this.get('session').get('isAuthenticated')){
      this.transitionTo('mensajes');
		}
  }

});
