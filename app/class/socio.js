import EmberObject from '@ember/object';

export default EmberObject.extend({

  iniciarSesion(servicio){
    servicio.open('firebase', {
      provider: 'password',
      email: this.get('Email'),
      password: this.get('Password')
    }).catch(function(error){
      console.log(error.message);
    });
  },

  cerrarSesion(servicio){
    servicio.close();
  }
});
