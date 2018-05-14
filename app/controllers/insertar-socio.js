import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	firebaseApp: service(),
	disable:false, 
    error: false,
	errorMessage: "Campos incompletos",

	actions: {
		crearUsuario(){
			var nombre = this.get('Nombre')
			var email = this.get('Email');
			var password = this.get('Contrasena');
			const auth = this.get('firebaseApp').auth();
			auth.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				var nuevoUsuario = this.store.createRecord('user',{
						id: user.uid,
						name: nombre,
						email: user.email,
						role: "Socio",
						type: "Nuevo",
						acepted: false
					});
					nuevoUsuario.save();
					this.set('error', true);
					this.set('errorMessage','Se creo el usuario espere la confirmacion del administrador');	
					Ember.run.later((() => {
						this.transitionToRoute('iniciar-sesion');
						this.set('error', false);
					  }), 2000);

			}).catch((error) => {
				this.set('error', true);
				this.set('errorMessage',error.message);
			});
		},
		iniciarSesion(){
			this.transitionToRoute('iniciar-sesion');
		}
	}
});