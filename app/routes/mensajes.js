import Route from '@ember/routing/route';

export default Route.extend({
	beforeModel(){
		this.controllerFor('mensajes').set('Admin',localStorage.rol === "Admin");
	}, 

	model() {
		return this.store.findAll('mensaje')
	},
});
