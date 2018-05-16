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
		/*var prestamo = this.store.createRecord('loan', {
        value: 10000,
        state: false,
        date: "18/02/2018"
      });

      this.store.findRecord('user', 'tKwcW1YoECQC02Gcj4NZs5P8Ul63')
        .then((user)=>{
          prestamo.set('user', user);
          user.get('loans').addObject(prestamo);
          prestamo.save().then(function () {
            return user.save();
          });
        });*/
		return this.store.query('loan', {
			orderBy: 'state',
			equalTo: false
		});
	}
});
