import Controller from '@ember/controller';

export default Controller.extend({
	error: false,
	errorMessage: null,

	actions: {
		rechazar(prestamo){
			this.store.findRecord('user', prestamo.get('user').get('id'))
				.then((usuario) => {
					prestamo.destroyRecord().then(() => {
						usuario.save().then(()=>{
							this.set('error', true);
							this.set('errorMessage', 'Exito el préstamo ha sido rechazado');
						});
					});
				});
		},

		aprobar(prestamo){
			this.store.findRecord('loan', prestamo.id).then((prestamo)=> {
				prestamo.set('state', true);
				prestamo.save().then(()=>{
					this.set('error', true);
					this.set('errorMessage', 'Exito el préstamo ha sido aprobado');
				});
			});
		}
	}
});
