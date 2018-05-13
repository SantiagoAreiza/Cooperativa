import DS from 'ember-data';

export default DS.Model.extend({
    text: DS.attr('string'),
    date: DS.attr('string'),

    //Relationship
    admin: DS.belongsTo('user', { async: true, inverse: null })
});
