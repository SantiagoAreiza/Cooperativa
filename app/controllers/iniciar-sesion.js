import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Usuario from '../class/socio';

export default Controller.extend({
  session: service(),

  actions: {
    signIn() {
      let usuarioIngresado = Usuario.create({
        Email: this.get('Email'),
        Password: this.get('Contrasena')
      })
      usuarioIngresado.iniciarSesion(this.get('session'));
    },

    signOut() {
      var usuarioAutenticado = Usuario.create();
      usuarioAutenticado.cerrarSesion(this.get('session'));
    }
  }
});
