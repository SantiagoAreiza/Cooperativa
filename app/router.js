import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('mensajes');
  this.route('insertar-socio');
  this.route('iniciar-sesion');
  this.route('proximas-cuotas');
  this.route('insertar-ahorro');
  this.route('aceptar-socio');
  this.route('prestamos-solicitados');
  this.route('historial-cuotas');
});

export default Router;
