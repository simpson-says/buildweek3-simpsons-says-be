const bcrypt = require('bcryptjs');

exports.userSeeds = function(knex) {
	return knex('users').truncate().then(function() {
		return knex('users').insert([
			{
				username: 'user1',
				pw: bcrypt.hashSync('pw', 8) // test user1, hash pw
			},
			{
				username: 'user2',
				pw: bcrypt.hashSync('password', 8)
			} // test user2, hash pw
		]);
	});
};
