const bcrypt = require('bcryptjs');

exports.quoteSeeds = function(knex) {
	return knex('quotes').truncate().then(function() {
		return knex('quotes').insert([
			{
				id: 1,
				user_id: 1,
				quote_id: 1
			},
			{
				id: 2,
				user_id: 2,
				quote_id: 2
			}
		]);
	});
};
