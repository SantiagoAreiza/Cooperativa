import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
	rol: null,
	usuario: null,
	session: service(),

  init(){
		this._super(...arguments);
	},
		
	getRol(){
		return this.get('rol');
	},

	setRol(valor){
		this.set('rol', valor);
	}
});
