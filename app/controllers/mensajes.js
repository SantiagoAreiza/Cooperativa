import Controller from '@ember/controller';
import Mensaje from '../class/mensaje';
import { set, get } from '@ember/object';

export default Controller.extend({
	error: { error: false, message: ""},
	camposInvalidos(arregloComponentes){
    for (var i = 0; i < arregloComponentes.length; i++) { 
      if(arregloComponentes[i] === "" || typeof(arregloComponentes[i])=="undefined"){
        return true;
      }
    }
  },
	actions: {
		publicarMensaje() {
			var fechaActual = new Date();
			var mensajeEscrito = this.get('mensaje');
			if(this.camposInvalidos([mensajeEscrito])){
				set(this.get('error'),'error',true);
        set(this.get('error'),'message',"Campos incompletos");
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

	}

});
