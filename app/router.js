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
});

export default Router;
