import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	firebaseApp: service(),

	actions: {
		crearUsuario: function(){
			var nombre = this.get('Nombre')
			var email = this.get('Email');
			var password = this.get('Contrasena');
			const auth = this.get('firebaseApp').auth();
			auth.createUserWithEmailAndPassword(email, password)
			.catch(function(error) {
				// Handle Errors here.
				console.log(error.message)
			});
			var nuevoUsuario = this.store.createRecord('usuario',{
				Nombre: nombre,
				Correo: email,
				Rol: "Socio",
				Tipo: "Nuevo"
			});
			nuevoUsuario.save();
		}
	}
});
