import Service from '@ember/service';

export default Service.extend({
    rol: null,

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
