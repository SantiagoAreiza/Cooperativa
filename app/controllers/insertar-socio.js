import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	firebaseApp: service(), 
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
					type: "Nuevo"
				});
				nuevoUsuario.save();
			}).catch((error) => {
				this.set('error', true);
				this.set('errorMessage',error.message);
			});
		}
	}
});