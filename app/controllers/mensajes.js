import { get } from '@ember/object';
import Controller from '@ember/controller';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Controller.extend(FindQuery, {
	error: false,
	errorMessage: "Campos invalidos",
  
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
				
				//Aquí se consulta el usuario que va a estar autenticado
				var administrador = this.store.createRecord('usuario', {
					Nombre: 'Simon',
					Correo: 'szeag2@aa.com',
					Rol: 'Admin'
				});
	
				administrador.get('mensajes').addObject(nuevoMensaje)
				nuevoMensaje.save().then(function () {
					return administrador.save();
				});
			}
		},
		buscarMensaje(){
			this.set('error', false);
			if(this.camposInvalidos([this.get('mensaje')])){
				this.set('error', true);
			}else{
				var Mensajes = {arreglo : []};
				this.filterContains(this.store, 'mensaje', {'texto':this.get('mensaje')}, function(mensajes){
					mensajes.forEach(element => {
						Mensajes.arreglo.push({texto: get( element , 'texto'), fecha: get( element , 'fecha')});
					});
				});
				this.set('model',Mensajes.arreglo);
			}
		}

	}

});
