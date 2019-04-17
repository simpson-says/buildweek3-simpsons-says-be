const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'omar', password: bcrypt.hashSync("password", 10), role: "admin"},
        {username: 'andrew', password: bcrypt.hashSync("password", 10), role: "user"},
        {username: 'john', password: bcrypt.hashSync("password", 10), role: "user"},
        {username: 'basil', password: bcrypt.hashSync("password", 10), role: "user"}
      ]);
    });
};
