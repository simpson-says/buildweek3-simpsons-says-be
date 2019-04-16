module.exports = server => {
    server.get('/docs', grabDoc);
  };

function grabDoc(req, res) {
// implement user registration
    res.status(200).send(require('../../../docs/main'))
}