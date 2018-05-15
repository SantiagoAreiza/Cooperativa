import DS from 'ember-data';

export default DS.Model.extend({
	payment: DS.attr('number'),
	interest: DS.attr('number'),
	fine: DS.attr('number'),
	administration: DS.attr('number'),
	date: DS.attr('string'),

	//Relationship
	loan: DS.belongsTo('loan', { async: true, inverse: null })
});
