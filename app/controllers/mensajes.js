import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	error: false,
	errorMessage: null,
	firebaseApp: service(),
	autenticacion: service(),
	Admin: false,


	
	camposInvalidos(arregloComponentes){
		for (var i = 0; i < arregloComponentes.length; i++) { 
			if(arregloComponentes[i] === "" ||typeof(arregloComponentes[i])=="undefined"){
				return true;
			}
		}
	},
	actions: {
		publicarMensaje() {
			this.set('error', false);
			var fechaActual = new Date();
			var mensajeEscrito = this.get('mensaje');
			if(this.camposInvalidos([mensajeEscrito])){
				this.set('error', true);
				this.set('errorMessage', 'Advertencia: Campos incompletos');
			}else{
				var nuevoMensaje = this.store.createRecord('message', {
					text: mensajeEscrito,
					date: fechaActual.getDate().toString() + '/' + (fechaActual.getMonth() + 1).toString() + '/' + fechaActual.getFullYear().toString()
				});
				this.store.findRecord('user', this.get('session').get('currentUser').uid)
					.then((administrador)=>{
						nuevoMensaje.set('admin',administrador);
						administrador.get('messages').addObject(nuevoMensaje);
						nuevoMensaje.save().then(function () {
							return administrador.save();
						});
					});
				this.set('error',true);
				this.set('errorMessage',"Exito: Mensaje publicado con éxito");
			}
		},
		buscarMensaje(){
			this.set('error', false);
			var textoBuscar = this.get('buscarMensaje');
			if(this.camposInvalidos([textoBuscar])){
				this.set('error', true);
			}else{
				this.store.findAll('message').then((mensajes)=>{
					//Logica para filtrar los mensajes
					if(mensajes.length == 0){
						this.set('error', true);
						this.set('errorMessage',"Advertencia: No se han encontrado mensajes");
					}else{
						this.set('model',mensajes);
					}
				})
			}
		}

	}

});
