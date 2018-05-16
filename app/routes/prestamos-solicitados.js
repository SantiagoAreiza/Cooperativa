import Route from '@ember/routing/route';

export default Route.extend({
	beforeModel() {
		if(!this.get('session').get('isAuthenticated')){
			return this.get('session').fetch()
				.then(()=>{
					this.store.findRecord('user', this.get('session').get('currentUser').uid)
						.then((user)=>{
							if(user.get('role') != 'Admin'){
								this.transitionTo('mensajes');
							}
						})
				}).catch(()=>{this.transitionTo('mensajes');});
		}else{
			this.store.findRecord('user', this.get('session').get('currentUser').uid)
			.then((user)=>{
				if(user.get('role') != 'Admin'){
					this.transitionTo('mensajes');
				}
			})
		}
	},

	model(){
		return this.store.query('loan', {
			orderBy: 'state',
			equalTo: false
		});
	}
});
