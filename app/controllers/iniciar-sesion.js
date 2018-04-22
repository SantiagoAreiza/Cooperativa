import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Usuario from '../Class/Usuario';

export default Controller.extend({
  session: service(),

  actions: {
    signIn() {
      let usuarioIngresado = Usuario.create({
        Email: this.get('Email'),
        Password: this.get('Contrasena')
      });
      usuarioIngresado.iniciarSesion();
    },

    signOut: function() {
      Usuario.cerrarSesion();
    }
  }
});
