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
* @apiDescription This Endpoint is used by Authorized users with granted permissions to retrieve all stored users from the database
* @apiPermission admin
*
* @apiGroup Admin
* 
* @apiHeader (Authorization) {Object} headers                           This is the Request headers 
* @apiHeader (Authorization) {Object} headers.Authorization             This is the Autorization object within the headers
* @apiHeader (Authorization) {String} headers.Authorization.token       This is the Autorization token recieved and stored upon login 
*
* @apiHeaderExample {json} Authorization Header-Example:
*     {
*       "headers": "Authorizaton": {
*       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijoib21hciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU1NTMxMjg4MCwiZXhwIjoxNTg2ODQ4ODgwfQ.Utm5C1v-_9Ql5tDPq7GvtWVZhYYpCZUz3q8bVCU2OwM"
*      }
*    }
* 
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     [
*       {
*         "id": 1,
*         "username": "omar",
*         "password": "$2a$10$SQpZI3OokvrWR80bFmrlD.BNVSlqbHDGhZRgqhrWr8bhbHgyBH7Uq",
*         "role": "admin"
*       },
*       {
*         "id": 2,
*         "username": "adam",
*         "password": "$2a$10$BlMZckrdp5QBVSdW/ZfncOyTlBXRGoFjFZ5h9UOm4mfbH2Jbvuvn6",
*         "role": "user"
*       },
*       {
*         "id": 3,
*         "username": "victor",
*         "password": "$2a$10$hVJEKAlxlWAKHaBhDu7W9uxWouxNqO5wJS0tPPM65uYCzSpMgPcpC",
*         "role": "user"
*       },
*       ...
*     ] 
*
* @apiSuccess {Array}   Users                Array of stored User Objects  
* @apiSuccess {Object}  Users.User           User Object
* @apiSuccess {Number}  Users.User.id        Users id.
* @apiSuccess {String}  Users.User.username  Users Username
* @apiSuccess {String}  Users.User.password  Users hashed and salted password
* @apiSuccess {String}  Users.User.role      Users Permissions
*
* @apiError 404     You are not authorized to access this end point
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 404 Bad Request
*     {
*       "message": "You are not authorized to access this end point"
*     }
*/
function getUsers(req, res) {
  // implement user registration
    db('users')
      .then(users => res.status(200).json(users))
      .catch(err => res.status(500).json({message:err}))
}

/**
* @api {post} /api/register Register New User
* @apiName Register User
* @apiGroup Authentication
*
* @apiParamExample {json} Input
*    {
*      "username": "doe",
*      "password": "thisIsHashedAndSalted",
*    }
*
*   | or |
*
*    {
*      "username": "doe",
*      "password": "thisIsHashedAndSalted",
*      "role": "Lead Dev",
*    }
*    
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
*       "role": "user"
*     }
*
* @apiSuccess {object} newUser New User Object
* @apiSuccess {number} newUser.id  New users id.
* @apiSuccess {string} newUser.username Users Username
* @apiSuccess {string} newUser.role Users Permissions
*
*
* @apiError 422-Unprocessable-entity Failed to submit one or more REQUIRED field
*
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
* @api {post} /api/Login User Login
* @apiName User Login
* @apiGroup Authentication
*
* @apiPermission admin
*

* @apiParamExample {json} Input 
*    {
*       "username": "homer",
*       "password": "password"
*     }
*
* @apiParam {Object} User                User
* @apiParam {Number} User.id            user id.
* @apiParam {String} User.password      Password.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*    {
*      "message": "Hello homer",
*      "token": "eyJybGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijoib31hciIsInJvbGUiOiJhZG5pbiIsIilhdCI6MTU1NTMxMjg4MCwiZXhwIjoxNTg2ODQ4ODgwfQ.Utm5C1v-_9Ql5tDPq7GvtWVZhYYpCZUz3q8bVCU2OwM"
*    }
*
* @apiSuccess {Object} Response            Response Object
* @apiSuccess {String} Response.message    Greeting Message to User
* @apiSuccess {String} Response.token      Authentication token
*
*
* @apiError 422 Failed to submit one or more REQUIRED field
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 422 Unprocessable Entity
*     {
*       "message":"Please fill out a username & password before submitting"
*     }
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



