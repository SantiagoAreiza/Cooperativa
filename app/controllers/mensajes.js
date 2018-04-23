import Controller from '@ember/controller';

export default Controller.extend({
	actions: {
		publicarMensaje() {
			var fechaActual = new Date();
			var mensajeEscrito = this.get('mensaje');
			var nuevoMensaje = this.store.createRecord('mensaje', {
				texto: mensajeEscrito,
				fecha: fechaActual.getTime()
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
		},

	}

});
