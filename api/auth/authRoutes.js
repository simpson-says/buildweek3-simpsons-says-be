const { authenticate, validateRole } = require('../auth/authenticate');
const db = require('../../data/dbConfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/admin/users', authenticate, validateRole, getUsers);
};

/**
 * @api{get} /api/users Request All User Data
 * @apiName Get Users
 * @apiPermission Admin
 * @apiGroup Admin
 */
function getUsers(req, res) {
  // implement user registration
    db('users')
      .then(users => res.status(200).json(users))
      .catch(err => res.status(500).json({message:err}))
}
/**
* @api {post} /api/register Registers New User
* @apiName Register User
* @apiGroup Authentication
* @apiParamExample {json} Input
*    {
*      "username": "doe",
*      "role": "user"
*    }.
*
* @apiParam {object} newUser New User
* @apiParam {number} newUser.id  New user id.
* @apiParam {String} newUser.password  New Password.
* @apiParam {role} [newUser.role=user]  Users Permissions 
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "id": 1,
*       "username": "doe",
*       "password": "password"
*       "role": "user"
*     }
*
* @apiSuccess {object} newUser New User Object
* @apiSuccess {number} newUser.id  New users id.
* @apiSuccess {string} newUser.username Users Username
* @apiSuccess {string} newUser.role Users Permissions
*
*
* @apiError Submission Failed to submit one or more REQUIRED field

* @apiErrorExample Error-Response:
*     HTTP/1.1 422 Unprocessable Entity
*     {
*       "message":"Please fill out a username & password before submitting"
*     }
*/


function register(req, res) {
  // implement user registration
    let { username, password, role } = req.body;
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
            .then(user => {res.status(200).json({username:user.username, id:user.id, role: user.role})})
            .catch(error => {res.status(500).json({message:"Internal Server Error finding the new User"})})
        })
        .catch(error => {
          res.status(500).json({message:"Internal Server Error adding the new User"});
        })
    : res.status(422).json({message:"Please fill out a username & password before submitting"})
}
/**
 * @api{post} /api/login Login user
 * @apiName Login User
 * @apiGroup Authentication
 */
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
          role:user.role
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
