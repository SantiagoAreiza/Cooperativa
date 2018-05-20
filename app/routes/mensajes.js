import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	autenticacion: service(),
	session: service(),

	beforeModel() {
		if(!this.get('autenticacion').getUsuario().get('acepted')){
			return this.get('session').close()
				.then(()=>{
					this.get('autenticacion').setUsuario(null);
					this.get('router').transitionTo('iniciar-sesion');
				});
		}
		this.controllerFor('mensajes').set('Admin',this.get('autenticacion').getUsuario().get('role') == 'Admin');
		this.controllerFor('mensajes').set('error',false);
	},

	model() {
		return this.store.findAll('message').then((mensajes) => {
			var mensajesTemporales = [];
			mensajes.forEach((mensaje)=> {
				var mensajeTemporal = {
					text : mensaje.get('text'),
					date : mensaje.get('date'),
				}
				mensajesTemporales = mensajesTemporales.concat(mensajeTemporal);
			})
			mensajesTemporales.sort(function(a,b){
			return new Date(b.date.split('/')[2], b.date.split('/')[1], b.date.split('/')[0]) - 
				new Date(a.date.split('/')[2], a.date.split('/')[1], a.date.split('/')[0])
			});
			return mensajesTemporales;
		})
	},
});
