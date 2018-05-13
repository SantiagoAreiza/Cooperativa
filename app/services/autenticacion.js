import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
	rol: null,
	session: service(),
	store: service(),

    init(){
		this._super(...arguments);
		if(this.get('session').get('isAuthenticated')){
			this.get('store').query('usuario', {
				orderBy: 'correo',
				equalTo: this.get('session').get('currentUser').email
			}).then((users)=> {
				users.forEach(user => {
					this.set('rol', user.get('rol'));
				});
			});
		}
	},
		
	getRol(){
		return this.get('rol');
	},

	setRol(valor){
		this.set('rol', valor);
	}
});
