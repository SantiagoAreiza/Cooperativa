import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
	usuario: null,
	session: service(),

	init(){
		this._super(...arguments);
	},
		
	getUsuario(){
		return this.get('usuario');
	},

	setUsuario(nuevoUsuario){
		this.set('usuario', nuevoUsuario);
	}
});
