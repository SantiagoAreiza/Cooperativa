import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	session: service(),
	autenticacion: service(),

	beforeModel() {
		if(!this.get('session').get('isAuthenticated')){
			return this.get('session').fetch()
				.then(()=>{
					this.store.findRecord('user', this.get('session').get('currentUser').uid)
						.then((user)=>{
							if(user.get('role') != 'Admin'){
								this.transitionTo('mensajes');
							}
						})
				}).catch(()=>{this.transitionTo('mensajes');});
		}else{
			this.store.findRecord('user', this.get('session').get('currentUser').uid)
			.then((user)=>{
				if(user.get('role') != 'Admin'){
					this.transitionTo('mensajes');
				}
			})
		}
	},

	model(){
		var fechaActual = new Date();
		var fecha_bono;
		if(parseInt(fechaActual.getMonth()) >= 7 && parseInt(fechaActual.getMonth()) <= 11){
			fecha_bono = true;
		}else{
			fecha_bono = false;
		}
		return {
			'users': this.store.query('user', {
									orderBy: 'role',
									equalTo: "Socio"
								}),
			'fecha': fecha_bono,
			'ahorro':
							{
								'fondo_solidaridad':1000,
								'cuota_base':30000,
								'bono': 20000,
								'fecha_insercion': fechaActual.getDate().toString() + '/' + (fechaActual.getMonth() + 1).toString() + '/' + fechaActual.getFullYear().toString()
							},
			'prestamos': this.store.findAll('loan')           
		}
	},
});
