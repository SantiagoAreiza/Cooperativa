import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { computed } from '@ember/object';

import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Controller.extend(FindQuery, {
	error: false,
	errorMessage: "Advertencia: Campos invalidos",
	firebaseApp: service(),
	Admin: computed(function(){
		return localStorage.rol === "Admin";
	}),
	init() {

		if(localStorage.rol==='null'){
			this.transitionToRoute('iniciar-sesion');
		}
	  },


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
			}else{
				var nuevoMensaje = this.store.createRecord('mensaje', {
					texto: mensajeEscrito,
					fecha: fechaActual.getDate().toString() + '/' + (fechaActual.getMonth() + 1).toString() + '/' + fechaActual.getFullYear().toString()
				});
				this.filterEqual(this.store, 'usuario', {'Correo':this.get('firebaseApp').auth().currentUser.email}, function(administradores){
					administradores.forEach(administrador => {
						administrador.get('mensajes').addObject(nuevoMensaje);
						nuevoMensaje.save().then(function () {
							return administrador.save();
						});
					});
				});
				this.set('model',this.store.findAll('mensaje'));
				this.set('error',true);
				this.set('errorMessage',"Exito: Mensaje publicado con éxito")
			}
		},
		buscarMensaje(){
			this.set('error', false);
			if(this.camposInvalidos([this.get('buscarMensaje')])){
				this.set('error', true);
			}else{
				var Mensajes = {arreglo : []};
				this.filterContains(this.store, 'mensaje', {'texto':this.get('buscarMensaje')}, function(mensajes){
					mensajes.forEach(element => {
						Mensajes.arreglo.push({texto: get( element , 'texto'), fecha: get( element , 'fecha')});
					});
				});
				this.set('model',Mensajes.arreglo);
			}
		}

	}

});
