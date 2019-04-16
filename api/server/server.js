const server = require('express')();

server.use(require('helmet')());
server.use(require('cors')());
server.use(require('express').json());

require('../auth/authRoutes')(server);
require('../routes/admin/adminRouter')(server);

server.get('/', (req, res) => {
    // Sanity Check
    res.send(`Server Home directory GET is active.`);
});
  
  module.exports = server;

  