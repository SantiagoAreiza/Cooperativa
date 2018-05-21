import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),

	beforeModel() {
		if(this.get('autenticacion').getUsuario().get('role') != 'Admin'){
			this.transitionTo('mensajes');
		}
	},

	model({ id }){
		return this.store.findRecord('user', id).then((usuario) => {
			return usuario.get('loans').then((prestamos) => {
				var prestamoCorrecto = null;
				prestamos.forEach((prestamo) => {
					if (prestamo.get('state')) {
						prestamoCorrecto = prestamo;
					}
				});
				if (prestamoCorrecto == null) {
					return {
						'error': true,
						'errorMessage': 'No tiene cuotas asociadas'
					}
				} else {
					return prestamoCorrecto.get('fees').then((cuotas) => {
						var cuotasTemporales = []
						cuotas.forEach((cuota) => {
							var nuevaCuota = {
								payment: cuota.get('payment'),
								interest: cuota.get('interest'),
								fine: cuota.get('fine'),
								administration: cuota.get('administration'),
								date: cuota.get('date'),
								total: cuota.get('payment') + cuota.get('interest') + cuota.get('fine') + cuota.get('administration')
							};
							cuotasTemporales = cuotasTemporales.concat(nuevaCuota);
						})
						if (cuotasTemporales.length == 0) {
							return {
								'error': true,
								'errorMessage': 'No tiene cuotas asociadas'
							}
						} else {
							cuotasTemporales.sort(function (a, b) {
								return new Date(a.date.split('/')[2], a.date.split('/')[1], a.date.split('/')[0]) -
									new Date(b.date.split('/')[2], b.date.split('/')[1], b.date.split('/')[0])
							});
							cuotasTemporales.forEach((cuota) => {
								cuota.payment = '$' + Number(cuota.payment).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
								cuota.interest = '$' + Number(cuota.interest).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
								cuota.administration = '$' + Number(cuota.administration).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
								cuota.fine = '$' + Number(cuota.fine).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
								cuota.total = '$' + Number(cuota.total).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
							})
							return {cuotas: cuotasTemporales, socio: usuario.get('name') };
						}
					});
				}
			});
		})
	}
});
