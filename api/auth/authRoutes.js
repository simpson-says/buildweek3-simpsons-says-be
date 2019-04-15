const { authenticate } = require('../auth/authenticate');
const db = require('../../data/dbConfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
};

function register(req, res) {
  // implement user registration
    let { username, password } = req.body;
    req.body.password = bcrypt.hashSync(password, 10);

    username && password
    ? db('users')
        .insert(req.body)
        .returning("id")
        .then(ids => {
          const id = ids[0];
          db('users')
            .where({ id })
            .first()
            .then(user => {res.status(200).json({username:user.username, id:user.id})})
            .catch(error => {res.status(500).json(error)})
        })
        .catch(error => {
          res.status(500).json(error);
        })
    : res.status(422).json({message:"Please fill out a username & password before submitting"})
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  username && password 
  ? db('users')
      .where({ username })
      .first()
      .then(user => {
        // JWT config data
        const payload = {
          subject: user.username,
        }
        const options = {
          expiresIn: '365d'
        }
        const token = jwt.sign(payload, secret, options)

        username && bcrypt.compareSync(password, user.password)
        ? res.status(200).json({ message: `Hello ${user.username}`, token })
        : res
            .status(401)
            .json({ message: 'Username or Password do not match out records' });
      })
      .catch(error => {
        res.status(500).json({error});
      })
  : res.status(422).json({message:"Please fill out a username & password before submitting"})
}