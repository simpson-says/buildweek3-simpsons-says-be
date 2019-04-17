const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./authModel');
const secret = process.env.shh || 'abcd';

require('../auth/authenticate').jwtKey;
const { authenticate } = require('../auth/authenticate');

const express = require('express');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

/*register - adds new user - user, 
password, ID - string, string, 2 

/login - let's existing user login user, 
password - string, string  */


function register(req, res) {
	const user = req.body;
	const hash = bcrypt.hashSync(user.pw, 8);
	user.pw = hash;

	if (user.username && user.pw) {
		db
			.addUser(user)
			.then(user => {
				res.status(201).json({ message: 'User added.', user });
			})
			.catch(err => {
				res.status(500).json({ message: 'Could not add user.' });
			});
	} else {
		res.status(401).json({ message: 'Username and password required.' });
	}
};

function login(req, res) {
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

function generateToken (user) {
	const payload = {
		subject: user.id,
		username: user.username
	};
	const options = {
		expiresIn: '1d'
	};
	return jwt.sign(payload, secret, options);
};

module.exports = router;
