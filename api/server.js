const express = require('express');
const server = express();
const { authenticate } = require('./auth/authenticate');
server.use(require('helmet')());
server.use(require('cors')());
server.use(require('express').json());

server.get('/', (req, res) => {
	res.status(200).json({ message: 'Api is running on port 4000' });
});

server.use("/api", require("./auth/authRouter"));
server.use("/api", authenticate, require("./quotes/quoteRouter"));

module.exports = server;
