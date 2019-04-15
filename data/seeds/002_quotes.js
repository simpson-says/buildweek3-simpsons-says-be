const bcrypt = require('bcryptjs');

exports.quoteSeeds = function(knex) {
	return knex('quotes').truncate().then(function() {
		return knex('quotes').insert([
			{
				id: 1,
				character: 'char1', // test char/quote
				quote: 'quote1'
			},
			{
				id: 2,
				character: 'char2',
				quote: 'quote2'
			}
		]);
	});
};
