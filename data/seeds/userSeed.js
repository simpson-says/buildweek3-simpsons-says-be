const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'omar', password: bcrypt.hashSync("password", 10)},
        {username: 'adam', password: bcrypt.hashSync("password", 10)},
        {username: 'victor', password: bcrypt.hashSync("password", 10)}
      ]);
    });
};
