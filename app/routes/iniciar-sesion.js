import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	session: service(),
	autenticacion: service(),

  beforeModel() {
		if(this.get('autenticacion').getUsuario() != null){
			if(!this.get('autenticacion').getUsuario().get('acepted')){
				this.get('session').close()
				.then(()=>{
					this.get('autenticacion').setUsuario(null);
					this.get('router').transitionTo('iniciar-sesion');
				});
			}
			this.transitionTo('mensajes');
		}
	},

});
