import DS from 'ember-data';

export default DS.Model.extend({
    value: DS.attr('number'),
    state: DS.attr('boolean'),
    date: DS.attr('string'),
    
    //Relationship
    user: DS.belongsTo('user', { async: true, inverse: null }),
    fees: DS.hasMany('fee', { async: true, inverse: null })
});
