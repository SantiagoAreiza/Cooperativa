import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
	session: service(),
	router: service(),
	autenticacion: service(),
	Admin: null,

	didReceiveAttrs() {
		this._super(...arguments);
		this.set('Admin', this.get('autenticacion').getRol() == 'Admin');
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
