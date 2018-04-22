import EmberObject from '@ember/object';

export default EmberObject.extend({

  iniciarSesion(servicio){
    servicio.open('firebase', {
      provider: 'password',
      email: this.get('Email'),
      password: this.get('Password')
    });
  },

  cerrarSesion(servicio){
    servicio.close();
  }
})