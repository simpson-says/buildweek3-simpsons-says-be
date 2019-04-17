
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {userID: 1, quoteID: 5},
        {userID: 1, quoteID: 13},
        {userID: 1, quoteID: 11},

        {userID: 2, quoteID: 5},
        {userID: 2, quoteID: 23},
        {userID: 2, quoteID: 11},

        {userID: 1, quoteID: 6},
        {userID: 1, quoteID: 13},
        {userID: 1, quoteID: 23},
      ]);
    });
};
