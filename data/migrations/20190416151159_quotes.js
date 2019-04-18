exports.up = function(knex) {
    return knex.schema
    .createTable('quotes', quotes => {
      quotes.increments();
      
      quotes
        .integer('quote_id')
        .unsigned()
        .notNullable()

      quotes
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable();
 
     quotes.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('quotes');
};
