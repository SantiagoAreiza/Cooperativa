import EmberObject from '@ember/object';

export default EmberObject.extend({
	publicarMensaje(administrador, store){
		var nuevoMensaje = store.createRecord('mensaje', {
			texto: this.get('texto'),
			fecha: this.get('fecha')
		});
		
		administrador.get('mensajes').addObject(nuevoMensaje)
		nuevoMensaje.save().then(function () {
			return administrador.save();
		});
	},

	verMensajes(servicio){
		return servicio.findAll('mensaje');
	}
});
