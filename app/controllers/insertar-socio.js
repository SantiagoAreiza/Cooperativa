import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	firebaseApp: service(), 
    error: false,
	errorMessage: "Campos invalidos",

	actions: {
		crearUsuario(){
			var nombre = this.get('Nombre')
			var email = this.get('Email');
			var password = this.get('Contrasena');
			const auth = this.get('firebaseApp').auth();
			auth.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				var nuevoUsuario = this.store.createRecord('usuario',{
					id: user.uid,
					nombre: nombre,
					correo: user.email,
					rol: "Socio",
					tipo: "Nuevo"
				});
				nuevoUsuario.save();
			}).catch((error) => {
				this.set('error', true);
				this.set('errorMessage',error.message);
			});
		}
	}
});