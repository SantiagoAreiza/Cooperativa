import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),

	beforeModel() {
		if(this.get('autenticacion').getUsuario().get('role') != 'Admin'){
			this.transitionTo('mensajes');
		}
	},

	model(){
		return this.store.query('loan', {
			orderBy: 'state',
			equalTo: false
		}).then((prestamos)=>{
			if(prestamos._length == 0){
				this.controllerFor('prestamos-solicitados').set('tabla', false);
				this.controllerFor('prestamos-solicitados').set('error', true);
				this.controllerFor('prestamos-solicitado').set('errorMessage', "No existen préstamos solicitados");
				return prestamos;
			}else{
				this.controllerFor('prestamos-solicitados').set('error', false);
				return prestamos;
			}
		});
	}
});
