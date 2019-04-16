exports.up = function(knex) {
	return knex.schema.createTable('quots', function(users) {
		users.increments();
		quotes.string('char');
		quotes.string('quotes');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('quotes');
};
