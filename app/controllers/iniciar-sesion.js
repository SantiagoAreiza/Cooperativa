import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  
  actions: {
    signIn() {
      var Email = this.get('Email');
      var Password = this.get('Contrasena');
      this.get('session').open('firebase', {
        provider: 'password',
        email: Email,
        password: Password
      });
    },
    signOut: function() {
      this.get('session').close();
    }
  }
});
