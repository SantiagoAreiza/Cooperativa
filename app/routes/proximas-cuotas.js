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
                this.get('autenticacion').setRol(user.get('role'));
              })
          }).catch(()=>{});
      }
    },
    
    model(){
        /*var loan = this.store.createRecord('loan', {
            value: 100000,
            state: true,
            date: "18/01/2018",
        });

        this.store.findRecord('user', this.get('session').get('currentUser').uid)
            .then((administrador)=>{
                loan.set('user',administrador);
                administrador.get('loans').addObject(loan);
                loan.save().then(function () {
                    return administrador.save();
                });
            });*/
      /*  var cuota = this.store.createRecord('fee', {
          payment: 100000,
          interest: 12000,
          fine: 0,
          administration: 0,
          date: "18/03/2018",
      });

      this.store.findRecord('loan', '-LCQG9hof5q0rE4aL9zM')
          .then((prestamo)=>{
              cuota.set('loan',prestamo);
              prestamo.get('fees').addObject(cuota);
              cuota.save().then(function () {
                  return prestamo.save();
              });
          });
      */
     this.store.findRecord('user', this.get('session').get('currentUser').uid)
      .then((user)=>{
        user.get('loans').forEach((prestamo)=>{
          console.log(prestamo);
        })
        
      })
        
        return this.store.query('loan', {
            orderBy: 'user',
            equalTo: this.get('session').get('currentUser').uid
            }).then((prestamos)=>{
                prestamos.forEach((prestamo) => {
                  if(prestamo.get('state')){
                    prestamo.get('fees').forEach((cuota) => {
                      //console.log(cuota);
                    });
                  }
                })
            });
    },


    afterModel(){
        if(this.get('autenticacion').getRol() == 'Admin'){
            this.transitionTo('mensajes');
        }
    }
});
