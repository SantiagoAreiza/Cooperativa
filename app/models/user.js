import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string'),
	type: DS.attr('string'),
	role: DS.attr('string'),
	acepted: DS.attr('boolean'),

	//Relationship
	messages: DS.hasMany('message', { async: true, inverse: null }),
	loans: DS.hasMany('loan', { async: true, inverse: null })
});
