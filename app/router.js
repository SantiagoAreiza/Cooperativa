import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.authenticatedRoute('mensajes');
  this.authenticatedRoute('insertar-socio');
  this.route('iniciar-sesion');
});

export default Router;
