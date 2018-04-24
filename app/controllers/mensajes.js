import { get, set } from '@ember/object';
import Controller from '@ember/controller';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Controller.extend({
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
		buscarMensaje(model){
			console.log(model);
			var mensaje =[];
			this.filterContains(this.store, 'mensaje', {'texto':this.get('mensaje')}, function(mensajes){
				model = mensajes;
				console.log(model);
				model.forEach(element => {
					console.log(get( element , 'texto'));
					mensaje.pushObject(get( element , 'texto'));
					
				});
			});

		}

	}

});
