import Controller from '@ember/controller';

export default Controller.extend({
	error: false,
	errorMessage: null,

	actions: {
		aprobarUsuario(usuario){
			this.store.findRecord('user', usuario.id).then((user)=> {
				user.set('acepted', true);
				user.save().then(()=>{
					this.set('error', true);
					this.set('errorMessage', 'Éxito el usario ha sido aceptado');
				}).catch(() => {
					this.set('error', true);
					this.set('errorMessage', 'Error: El usuario no pudo ser aceptado');
				});
			});
		}
	}
});
