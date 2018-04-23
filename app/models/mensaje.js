import DS from 'ember-data';

export default DS.Model.extend({
    texto: DS.attr('string'),
    fecha: DS.attr('string'),
    administrador: DS.belongsTo('usuario', { async: false, inverse: null })
});
