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
  this.route('aceptar-socio');
  this.route('prestamos-solicitados');
  this.route('insertar-ahorro');
  this.route('solicitar-prestamo');
  this.route('historial-cuotas-socios');
	this.route('historial-cuotas-socio', function() {
    this.route('socio', { path : ':id' });
  });
  this.route('historial-cuotas');
});

export default Router;
