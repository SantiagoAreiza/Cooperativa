import Controller from '@ember/controller';
import Mensaje from '../class/mensaje';

export default Controller.extend({
	actions: {
		publicarMensaje() {
			var fechaActual = new Date();
			var mensajeEscrito = this.get('mensaje');
			var nuevoMensaje = Mensaje.create({
				texto: mensajeEscrito,
				fecha: fechaActual.getTime()
			});
			//Aquí se consulta el usuario que va a estar autenticado
			var administrador = this.store.createRecord('usuario', {
				Nombre: 'Simon',
				Correo: 'szeag2@aa.com',
				Rol: 'Admin'
			});

			nuevoMensaje.publicarMensaje(administrador, this.store);
		},

	}

});
