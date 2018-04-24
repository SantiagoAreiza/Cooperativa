import { get, set } from '@ember/object';
import Controller from '@ember/controller';
import Mensaje from '../class/mensaje';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';


export default Controller.extend(FindQuery,{

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
