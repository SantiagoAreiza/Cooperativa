import Controller from '@ember/controller';

export default Controller.extend({
	error: false,
	errorMessage: null,

	actions: {
		aprobarSocio(usuario){
			this.store.findRecord('user', usuario.id).then((user)=> {
				user.set('acepted', true);
				user.set('waiting', false);
				user.save().then(()=>{
					this.set('error', true);
					this.set('errorMessage', 'Éxito el socio ha sido aceptado');
				}).catch(() => {
					this.set('error', true);
					this.set('errorMessage', 'Error: El socio no pudo ser aceptado');
				});
			});
		},
				rechazarSocio(usuario){
			this.store.findRecord('user', usuario.id).then((user)=> {
				user.set('waiting', false);
				user.save().then(()=>{
					this.set('error', true);
					this.set('errorMessage', 'Éxito el socio ha sido rechazado');
				}).catch(() => {
					this.set('error', true);
					this.set('errorMessage', 'Error: El socio no pudo ser rechazado');
				});
			});
		},

	}
});
