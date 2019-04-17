
exports.up = function(knex) {
    return knex.schema
    .createTable('users', function(users) {
      users.increments('id');

      users
        .string('username')
        .notNullable()
        .unique();

      users
        .string('password')
        .notNullable()
      users
        .string('role')
        .notNullable()
        .defaultTo("user")
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
;
