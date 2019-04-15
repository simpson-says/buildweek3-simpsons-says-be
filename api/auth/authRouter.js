// const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./authModel');
const secret = process.env.shh || 'abcd';

require('../auth/authenticate').jwtKey;
const { authenticate } = require('../auth/authenticate');

module.exports = server => {
	server.post('/api/register', register);
	server.post('/api/login', login);
};

register = (req, res) => {
	const user = req.body;
	const hash = bcrypt.hashSync(user.password, 8);
	user.password = hash;

	if (user.username && user.password) {
		db
			.addUser(user)
			.then(user => {
				res.status(201).json(user);
			})
			.catch(err => {
				res.status(500).json({ message: 'Could not add user.' });
			});
	} else {
		res.status(401).json({ message: 'Username and password required.' });
	}
};

login = (req, res) => {
	const { username, password } = req.body;

	if (username && password) {
		db
			.getUserByName({ username })
			.then(user => {
				if (bcrypt.compareSync(password, user.password)) {
					const token = generateToken(user);

					res.status(200).json({ message: 'Logged in', token });
				} else {
					res.status(401).json({ message: 'Username or password is invalid.' });
				}
			})
			.catch(err => {
				res.status(500).json({ message: 'Could not log in' });
			});
	} else {
		res.status(401).json({ message: 'Username and password required.' });
	}
};

generateToken = user => {
	const payload = {
		subject: user.id,
		username: user.username
	};
	const options = {
		expiresIn: '1d'
	};
	return jwt.sign(payload, secret, options);
};
