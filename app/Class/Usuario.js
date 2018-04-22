import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default EmberObject.extend({
  session: service(),

  iniciarSesion(){
    this.get('session').open('firebase', {
      provider: 'password',
      email: this.get('Email'),
      password: this.get('Password')
    });
  },

  cerrarSesion(){
    this.get('session').close();
  }
});
