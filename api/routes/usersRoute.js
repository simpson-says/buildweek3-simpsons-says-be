const { authenticate, validateRole } = require('../auth/authenticate');
const db = require('../../data/dbConfig')


module.exports = server => {
  server.post('/api/users/:id', authenticate, update);
};

function update(req, res) {
    const changes = req.body
    return db('users')
      .where({id : req.params.id})
      .update(changes)
      .then(updateFlag => res.status(200).json({updated: Boolean(updateFlag)}))
}
  