import DS from 'ember-data';

export default DS.Model.extend({
  Nombre: DS.attr('string'),
  Correo: DS.attr('string'),
});
