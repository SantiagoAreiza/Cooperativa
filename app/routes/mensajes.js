import Route from '@ember/routing/route';
import Mensaje from '../class/mensaje';

export default Route.extend({
	model() {
		let mensajes = Mensaje.create();
		return mensajes.verMensajes(this.store);
	}
});
