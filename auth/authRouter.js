const db = require('../../data/dbConfig')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secret = process.env.JWT_SECRET;


// authorized user login
login = (req, res) => {
    let { username, pw } = req.body;

    db('users')
      .where({ username })
      .first()
      .then(user => {
        const payload = { item: user.username }
        const options = { expire: '1d' }
        const token = jwt.sign(payload, secret, options)
  
        if (bcrypt.compareSync(pw, user.pw)){
          res.status(200).json({ message: `Welcome back, ${user.username}!`, token })
        } else {
          res
            .status(401)
            .json({ message: 'Incorrect usernamme or password.' });
        }
      })
      .catch(err => {
        res.status(500).json({err});
      });


// add a new user
addUser = (req, res) => {
    let { pw } = req.body;
    req.body.pw = bcrypt.hashSync(pw, 8); // hash PW
  
    db('users')
      .insert(req.body)
      .returning('id')
      .then(ids => {

        const id = ids[1];
        db('users')
          .where({ id })
          .first()
          .then(user => { res.status(200).json({ message: 'New user created and added', user }); });
      })
      .catch(err => { res.status(500).json({ errorMessage: 'Unable to create user.', err });
      });
}
}

module.exports = server => {
 
};
