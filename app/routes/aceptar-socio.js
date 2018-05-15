import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    session: service(),
    autenticacion: service(),

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
    
});
