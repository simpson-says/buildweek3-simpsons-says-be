const { authenticate, validateRole } = require('../auth/authenticate');
const db = require('../../data/dbConfig')


module.exports = server => {
  server.post('/api/users/:id', authenticate, update);
};

function update(changes, req, res) {
    return db('users')
      .where({id:req.params.id})
      .update(changes)
      .then(updatedUser => res.status(200).json(updatedUser))
}
  