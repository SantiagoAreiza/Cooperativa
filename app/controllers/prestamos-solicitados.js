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
							this.set('errorMessage', 'Éxito el préstamo ha sido rechazado');
						}).catch(() => {
							this.set('error', true);
							this.set('errorMessage', 'Error: El préstamo no pudo ser rechazado');
						});
					});
				});
		},

		aprobar(prestamo){
			this.store.findRecord('loan', prestamo.id).then((prestamo)=> {
				prestamo.set('state', true);
				prestamo.save().then(()=>{
					this.set('error', true);
					this.set('errorMessage', 'Éxito el préstamo ha sido aprobado');
				}).catch(() => {
					this.set('error', true);
					this.set('errorMessage', 'Error: El préstamo no pudo ser aprobado');
				});
			});
		}
	}
});
