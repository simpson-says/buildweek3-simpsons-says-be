
exports.up = function(knex) {
    return knex.schema
    .createTable('favorites', function(favorites) {

      favorites
        .integer('userID')
        .references("users.id")
        .notNullable()

      favorites
        .integer('quoteID')
        .notNullable()
      
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('favorites');
};

