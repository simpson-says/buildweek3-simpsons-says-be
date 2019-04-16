exports.up = function(knex) {
    return knex.schema
    .createTable('quotes', quotes => {
      quotes.increments();

      quotes
        .string('char')
        .notNullable()
        .unique();

      quotes
        .string('quote')
        .notNullable()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('quotes');
};
;