import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	session: service(),
	autenticacion: service(),

	beforeModel() {
		if(this.get('autenticacion').getUsuario().get('role') != 'Admin'){
			this.transitionTo('mensajes');
		}
	},

	model() {
		return  this.store.query('user', {orderBy: 'acepted',	equalTo: false})
			.then((usuarios)=>{
			if(usuarios._length == 0){
				this.controllerFor('aceptar-socio').set('error', true);
				this.controllerFor('aceptar-socio').set('errorMessage', "No existen usuarios para confirmar");
				return usuarios;
			}else{
				return usuarios;
			}
		})
			
	}
});
