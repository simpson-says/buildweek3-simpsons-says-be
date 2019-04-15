exports.up = function(knex) {
	return knex.schema.createTable('quotes', function(users) {
		users.increments();
		quotes.string('char');
		quotes.string('quote');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('quotes');
};
