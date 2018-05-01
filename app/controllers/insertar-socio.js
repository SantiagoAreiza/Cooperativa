import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
	firebaseApp: service(), 
    error: false,
	errorMessage: "Campos invalidos",

	actions: {
		crearUsuario: function(){
			var nombre = this.get('Nombre')
			var email = this.get('Email');
			var password = this.get('Contrasena');
			const auth = this.get('firebaseApp').auth();
			var MError = { error: false, message: "Campos invalidos"};
			auth.createUserWithEmailAndPassword(email, password)
			.then(() => {
				var nuevoUsuario = this.store.createRecord('usuario',{
					Nombre: nombre,
					Correo: email,
					Rol: "Socio",
					Tipo: "Nuevo"
				});
				nuevoUsuario.save();
			}).catch(function(error){
				set(MError,'error',true);
				set(MError,'message',error.message);
			});
			this.set('error', MError.error);
			this.set('errorMessage', MError.message);
		}
	}
});