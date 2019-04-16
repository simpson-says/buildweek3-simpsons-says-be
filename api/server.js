const express = require('express');
const server = express();
server.use(require('helmet')());
server.use(require('cors')());
server.use(require('express').json());

require('../api/auth/authRouter');
require('../api/quotes/quoteRouter');

server.get('/', (req, res) => {
	res.status(200).json({ message: 'Api is running on port 4000' });
});

module.exports = server;
