const { authenticate, validateRole } = require('../auth/authenticate');
const db = require('../../data/dbConfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
};

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
* @apiDescription This end point will log users in by creating a limited timed access token. 
*   This token will need to be stored and sent in ALL requests made to the server, and will 
*   include your role based permissions for end point access. See the below example for reference.
*
* @apiPermission admin
*
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
*      "token": "eyJybGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijoib31hciIsInJvbGUiOiJhZG5pbiIsIilhdCI6MTU1NTMxMjg4MCwiZXhwIjoxNTg2ODQ4ODgwfQ.Utm5C1v-_9Ql5tDPq7GvtWVZhYYpCZUz3q8bVCU2OwM",
*      "favorites":  [
*        5,
*        13,
*        11,
*        6
*      ]
*    }
*
* @apiSuccess {Object} Response               Response Object
* @apiSuccess {String} Response.message       Greeting Message to User
* @apiSuccess {String} Response.token         Authentication token
* @apiSuccess {Array}  Response.favorites     Array of favorite quoteIDs
*
*
* @apiError 422 Failed to submit one or more REQUIRED field
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 422 Unprocessable Entity
*     {
*       "message":"Please fill out a username & password before submitting"
*     }
*
* @apiHeader (Authorization) {Object} headers                           This is the Request headers 
* @apiHeader (Authorization) {Object} headers.Authorization             This is the Authorization object within the headers
* @apiHeader (Authorization) {String} headers.Authorization.token       This is the Authorization token received and stored upon login 
*
* @apiHeaderExample {json} Authorization Header-Example:
*     {
*       "headers": "Authorization": {
*       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijoib21hciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU1NTMxMjg4MCwiZXhwIjoxNTg2ODQ4ODgwfQ.Utm5C1v-_9Ql5tDPq7GvtWVZhYYpCZUz3q8bVCU2OwM"
*      }
*    }
* 
*/

function login(req, res) {
  // implement user login
  let { username, password } = req.body;
  username && password 
  ? db('users')
  .where({ username })
  .first()
  .then(async user => {
    // JWT config data
    const payload = {
      subject: "User-Data",
      username: user.username,
      id: user.id,
      role: user.role
    }
    const options = {
      expiresIn: '365d'
    }
    const token = jwt.sign(payload, secret, options)
    const favorites = await db('favorites')
                      .where({userID: payload.id})
                      .then(favArray => favArray.map(favObj => favObj.quoteID))
    
        username && bcrypt.compareSync(password, user.password)
          ? res.status(200).json({ message: `Hello ${user.username}`, token, favorites })
          : res
            .status(401)
            .json({ message: 'Username or Password do not match out records' });
      })
      .catch(error => {
        res.status(500).json({error});
      })
  : res.status(422).json({message:"Please fill out a username & password before submitting"})
}



