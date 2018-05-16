import DS from 'ember-data';

export default DS.Model.extend({
	solidarityFund: DS.attr('number'),
	baseFee: DS.attr('number'),
	bond: DS.attr('number'),
	date: DS.attr('string'),

	//Relationship
	user: DS.belongsTo('user', { async: true, inverse: null })
});


