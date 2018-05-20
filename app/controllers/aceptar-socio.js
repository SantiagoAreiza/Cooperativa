import Controller from '@ember/controller';

export default Controller.extend({
	error: false,
	errorMessage: null,

	actions: {
		aprobarSocio(usuario) {
			var fechaActual = new Date();
			var prestamoInicial = this.get('store').createRecord('loan', {
				value: 800000,
				state: false,
				date: fechaActual.getDate().toString() + '/' + (fechaActual.getMonth() + 1).toString() + '/' + fechaActual.getFullYear().toString(),
			});
			this.store.findRecord('user', usuario.id).then((user) => {
				prestamoInicial.set('user', user);
				user.get('loans').addObject(prestamoInicial);
				user.set('acepted', true);
				user.set('waiting', false);
				prestamoInicial.save().then(() => {
					return user.save().then(() => {
						this.set('error', true);
						this.set('errorMessage', 'Éxito: el socio ha sido aceptado');
					}).catch(() => {
						this.set('error', true);
						this.set('errorMessage', 'Error: El socio no pudo ser aceptado');
					});
				})
			});
		},
		rechazarSocio(usuario) {
			this.store.findRecord('user', usuario.id).then((user) => {
				user.set('waiting', false);
				user.save().then(() => {
					this.set('error', true);
					this.set('errorMessage', 'Éxito: el socio ha sido rechazado');
				}).catch(() => {
					this.set('error', true);
					this.set('errorMessage', 'Error: El socio no pudo ser rechazado');
				});
			});
		},

	}
});
