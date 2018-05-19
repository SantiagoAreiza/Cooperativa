import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Controller.extend({
	firebaseApp: service(),
	disable:false, 
	error: false,
	errorMessage: "Campos incompletos",

	camposIncompletos(arregloComponentes){
		for (var i = 0; i < arregloComponentes.length; i++) {
			if(arregloComponentes[i] === "" ||typeof(arregloComponentes[i])=="undefined"){
				return true;
			}
		}
	},

	actions: {
		crearUsuario(){
			var nombre = this.get('Nombre')
			var email = this.get('Email');
			var password = this.get('Contrasena');
			var Regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
			if(this.camposIncompletos([email,password,nombre])){
				this.set('error', true);
				this.set('errorMessage' , 'Campos incompletos');
			}else if(!(Regex.test(email))){
				this.set('error', true);
				this.set('errorMessage' , 'Formato del correo invalido');
				this.set('email','');
				this.set('Contrasena','');
			}else if(password.length < 6){
				this.set('error', true);
				this.set('errorMessage' , 'La contraseña debe ser más de 6 digitos');
				this.set('Contrasena','');
			}else{
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
						later((() => {
							this.transitionToRoute('iniciar-sesion');
							this.set('error', false);
						}), 2000);
					}).catch((error) => {
						this.set('error', true);
					switch(error.code) {
						case 'auth/email-already-in-use':
								this.set('errorMessage' , 'El socio ya existe');
								this.set('Contrasena','');
								break;
						default:
							this.set('errorMessage' , error.message);
					}
					});
			}

		},
		
		iniciarSesion(){
			this.transitionToRoute('iniciar-sesion');
		}
	}
});