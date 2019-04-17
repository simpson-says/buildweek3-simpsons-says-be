const { authenticate, validateRole } = require('../../auth/authenticate');
const db = require('../../../data/dbConfig')


module.exports = server => {
  server.post('/api/admin/users/:id', authenticate, validateRole, update);
  server.delete('/api/admin/del/:id', authenticate, validateRole, deleteUser);
};

/**
* @api {post} /api/users/:id Update User Row
* @apiName Update-User
* @apiGroup Admin
* @apiDescription This endpoint is restricted to members with admin permissions and directly modifies the user row in the database.
*       This can be used to grant additional permissions needed or update user details.
*
* @apiPermission admin
*
* @apiHeader (Authorization) {Object} headers                           This is the Request headers 
* @apiHeader (Authorization) {Object} headers.Authorization             This is the Authorization object within the headers
* @apiHeader (Authorization) {String} headers.Authorization.token       This is the Authorization token recieved and stored upon login 
*
* @apiHeaderExample {json} Authorization Header-Example:
*     {
*       "headers": "Authorization": {
*       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijoib21hciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU1NTMxMjg4MCwiZXhwIjoxNTg2ODQ4ODgwfQ.Utm5C1v-_9Ql5tDPq7GvtWVZhYYpCZUz3q8bVCU2OwM"
*      }
*    }
*  
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
* @apiPermission admin
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
  