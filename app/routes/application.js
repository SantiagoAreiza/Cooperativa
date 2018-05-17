import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),
	session: service(),

	beforeModel(){
		return this.get('session').fetch().then(()=>{
			return this.store.findRecord('user', this.get('session').get('currentUser').uid).then((usuario) => {
				if(!this.get('autenticacion').getUsuario().get('acepted')){
					return this.get('session').close()
						.then(()=>{
							this.transitionTo('iniciar-sesion');
						});
				}
				return this.get('autenticacion').setUsuario(usuario);
			});
		}).catch(()=>{
				this.transitionTo('iniciar-sesion');
			});
	},
});
