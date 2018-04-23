import DS from 'ember-data';

export default DS.Model.extend({
    texto: DS.attr('string'),
    fecha: DS.attr('number'),
    administrador: DS.belongsTo('usuario', { async: false, inverse: null })
});
