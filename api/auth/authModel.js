const db = require('../../data/dbConfig');

module.exports = {
  getUserByName,
  addUser
};

function getUserByName(filter) {
  return db('users')
    .where(filter)
    .first();
}

function addUser(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return getUserById(ids[0]);
    });
}

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}