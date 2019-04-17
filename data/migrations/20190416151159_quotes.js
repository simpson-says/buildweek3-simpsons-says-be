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

      quotes
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable();
 
     tbl.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('quotes');
};
;