import DS from 'ember-data';

export default DS.Model.extend({
    Nombre: DS.attr('string'),
    Correo: DS.attr('number'),
    Tipo: DS.attr('string'),
    Rol: DS.attr('string'),
    mensajes: DS.hasMany('mensaje', { async: true, inverse: null })
});
