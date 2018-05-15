import Route from '@ember/routing/route';

export default Route.extend({
    beforeModel() {
			if(!this.get('session').get('isAuthenticated')){
				return this.get('session').fetch()
				.then(()=>{
					this.transitionTo('mensajes');
				}).catch(()=>{});
			}
	},
});
