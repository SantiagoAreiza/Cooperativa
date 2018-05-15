import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
	session: service(),
	router: service(),
	store: service(),
	autenticacion: service(),
	Admin: null,

	didReceiveAttrs() {
		this._super(...arguments);
		if(this.get('session').get('isAuthenticated')){
			this.get('store').findRecord('user', this.get('session').get('currentUser').uid)
			.then((user)=>{
				this.set('Admin', user.get('role') == 'Admin');
			})
		}else{
			this.get('session').fetch()
			.then(()=>{
				this.store.findRecord('user', this.get('session').get('currentUser').uid)
					.then((user)=>{
						this.set('Admin', user.get('role') == 'Admin');
					})            
			}).catch(()=>{});
		}
	},

	actions: {
		signOut: function() {
			this.get('session').close()
				.then(()=>{
					this.get('autenticacion').setRol(null);
					this.get('router').transitionTo('iniciar-sesion');
				});
		}
	}
    
});
