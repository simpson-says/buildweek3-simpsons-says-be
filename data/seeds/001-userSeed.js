const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      return knex('users').insert([
        {username: 'omar', password: bcrypt.hashSync("password", 10), role: "admin"},
        {username: 'andrew', password: bcrypt.hashSync("password", 10), role: "user"},
        {username: 'john', password: bcrypt.hashSync("password", 10), role: "user"},
        {username: 'basil', password: bcrypt.hashSync("password", 10), role: "user"}
      ]);
};
