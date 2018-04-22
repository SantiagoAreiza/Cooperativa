import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Usuario from '../Class/Usuario';

export default Controller.extend({
  session: service(),

  actions: {
    signIn() {
      var Email= this.get('Email'),
      var Password= this.get('Contrasena');
      this.get('session').open('firebase', {
        provider: 'password',
        email: this.get('Email'),
        password: this.get('Password')
      });
    },

    signOut: function() {
      this.get('session').close();
    }
  }
});
