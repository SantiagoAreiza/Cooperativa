import DS from 'ember-data';

export default DS.Model.extend({
    nombre: DS.attr('string'),
    correo: DS.attr('string'),
    tipo: DS.attr('string'),
    rol: DS.attr('string'),
    mensajes: DS.hasMany('mensaje', { async: true, inverse: null })
});
