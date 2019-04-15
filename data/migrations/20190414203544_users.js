exports.up = function(knex) {
	return knex.schema.createTable('users', function(users) {
		users.increments();
		users.string('username').unique().notNullable();
		users.string('pw').unique().notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
