import DS from 'ember-data';

export default DS.Model.extend({
    texto: DS.attr('string'),
    fecha: DS.attr('string'),

    //Relationship
    administrador: DS.belongsTo('usuario', { async: true, inverse: null })
});
