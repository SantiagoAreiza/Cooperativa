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
		if(this.get('autenticacion').getUsuario() != null){
			this.set('Admin', this.get('autenticacion').getUsuario().get('role') == 'Admin');
		}
	},

	actions: {
		cerrarSesion() {
			this.get('session').close()
				.then(()=>{
					this.get('autenticacion').setUsuario(null);
					this.get('router').transitionTo('iniciar-sesion');
				});
		}
	}
    
});
