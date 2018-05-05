import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Controller.extend(FindQuery, {
  session: service(),
  error: false,
  errorMessage: "Campos invalidos",

  camposInvalidos: function(arregloComponentes){
    for (var i = 0; i < arregloComponentes.length; i++) {
      if(arregloComponentes[i] === "" ||typeof(arregloComponentes[i])=="undefined"){
        return true;
      }
    }
  },

  actions: {
    signIn() {
      this.set('error', false);
      this.set('errorMessage' , 'Campos invalidos');
      var Email = this.get('Email');
      var Password = this.get('Contrasena');
      if(this.camposInvalidos([Email,Password])){
        this.set('error', true);
      }else{
        this.get('session').open('firebase', {
          provider: 'password',
          email: Email,
          password: Password
        }).then((user) => {
          this.store.query('usuario', {
            orderBy: 'id',
            equalTo: user.id
          }).then((user)=> {
            this.get('session').set('Rol',user.get('rol'));
            this.transitionToRoute('mensajes');
            this.set('Contrasena','');
            this.set('Email','');
          });
        }).catch((error) => {
          this.set('error', true);
          this.set('errorMessage' , error.message);
        });
      }
    },
  }
});
