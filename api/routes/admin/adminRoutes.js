const { authenticate, validateRole } = require('../../auth/authenticate');
const db = require('../../../data/dbConfig')


module.exports = server => {
  server.get('/api/admin/users', authenticate, validateRole, getUsers);
  server.post('/api/admin/users/:id', authenticate, validateRole, update);
  server.delete('/api/admin/del/:id', authenticate, validateRole, deleteUser);
};

/**
* @api{get} /api/admin/users Request All User Data
* @apiName Get Users
* @apiDescription This Endpoint is used by Authorized users with granted permissions to retrieve all stored users from the database
* @apiPermission admin
*
* @apiGroup Admin
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
      .then(async users => {
        users.map(async user => ({...user, favorites: await db('favorites').where({userID: user.id})})) 
        res.status(200).json(users)
      })
      .catch(err => res.status(500).json({message:err}))
}

/**
* @api {post} /api/users/:id Update User Row
* @apiName Update-User
* @apiGroup Admin
* @apiDescription This endpoint is restricted to members with admin permissions and directly modifies the user row in the database.
*       This can be used to grant additional permissions needed or update user details.
*
* @apiPermission Admin
*
* @apiParamExample {json} Input 
*     {
*       "username": "homer"
*     }
*
*     | or | 
*
*     {
*       "role": "admin"
*     }
*
*     | or |
*
*     {
*       "username": "homer",
*       "role": "admin"
*     }
* @apiParam {Object} Updated-User         User object with 1 or more optional field changed
* @apiParam {String} [User.username]      Updated username
* @apiParam {String} [User.role]          Users Roles for permissions
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*    {
*      "updated": true,
*    }
*
* @apiSuccess {Object} Response             Response Object
* @apiSuccess {Boolean} Response.updated    Boolean Value Indicating successful User Update
*
*
* @apiError Submission Failed to submit one or more REQUIRED field
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 500 Internal Server Error
*     {
*        message: "Internal Server Error, failed to update User."
*     }
*/

function update(req, res) {
    const changes = req.body
    return db('users')
      .where({id : req.params.id})
      .update(changes)
      .then(updateFlag => res.status(200).json({updated: Boolean(updateFlag)}))
      .catch(err => res.status(500).json({message: "Internal Server Error, failed to update User."}))
}

/**
* @api {delete} /api/admin/del/:id  Delete User Row
* @apiName Delete-User
* @apiGroup Admin
* @apiDescription This endpoint is restricted to members with admin permissions and deletes the user row in the database.
* @apiPermission Admin
*
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*    {
*      "deleted": true,
*    }
*
* @apiSuccess {Object} Response             Response Object
* @apiSuccess {Boolean} Response.updated    Boolean Value Indicating successful User Update
*
*
* @apiError 500 Failed to submit one or more REQUIRED field
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 500 Internal Server Error
*     {
*        message: "Internal Server Error, failed to delete User."
*     }
*/

function deleteUser(req, res) {
    return db('users')
      .where({id : req.params.id})
      .del()
      .then(updateFlag => (res.status(200).json({deleted: Boolean(updateFlag)})) )
      .catch(err => res.status(500).json({message: "Internal Server Error, failed to delete User."}))
}
