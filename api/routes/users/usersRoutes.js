const { authenticate, validateRole } = require('../../auth/authenticate');
const db = require('../../../data/dbConfig')
const axios = require('axios')

module.exports = server => {
    server.post('/users/favorites', authenticate, addFavorite);
    server.post('/users/search', authenticate, searchDeepBE);
    server.get('/users/favorites', authenticate, getFavorites);
  };

/**
* @api {post} /api/Users/favorites  Add a new User favorite
* @apiName Post-Favorites
* @apiGroup Users
* @apiDescription This endpoint is open to all users to add a favorite quote to our DB for querying.
* @apiPermission Users
*
* @apiHeader (Authorization) {Object} headers                           This is the Request headers 
* @apiHeader (Authorization) {Object} headers.Authorization             This is the Authorization object within the headers
* @apiHeader (Authorization) {String} headers.Authorization.token       This is the Authorizations token recieved and stored upon login 
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
*    [
*
*    ]
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
function searchDeepBE(req, res) {
    const searchString = req.body.searchValue
    
    axios.post('', searchString)
        .then(deepBERes => { 
            res.status(200).json({Querying: searchString})
            res.data = deepBERes
        })
        .Catch(error => res.status(500).json({message: "Error Sending out search String for query", error}))
    
}

/**
* @api {post} /api/Users/favorites  Add a new User favorite
* @apiName Post-Favorites
* @apiGroup Users
* @apiDescription This endpoint is open to all users to add a favorite quote to our DB for querying.
* @apiPermission Users
*
*  
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*    {
*      "Favorite-Added": true,
*    }
*
* @apiSuccess {Object}  Response             Response Object
* @apiSuccess {Boolean} Response.Favorite    Boolean Value Indicating successful User Update
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

function addFavorite(req, res) {
    const favoriteQuote = req.body

    db('favorites')
        .insert(favoriteQuote)
        .then(favoriteAdded => res.status(200).json(Boolean(favoriteAdded)))
        .catch(err => res.status(500).json({message:err}))
}

function getFavorites(req, res) {
    const userID = req.decoded.id

    db('favorites')
        .where({ userID })
        .then(favorites => {
            res.status(200).json({Retrieving: favorites.quoteID})

            axios.post('', [favorites.quoteID])
                .then(res => res.status(200).json(res.data))
                .Catch(error => res.status(500).json({message: "Error Sending out Favorites list for query", error}))
        })
        .catch(error => res.status(500).json({message:"Failed to find that you in our records", error}))
}

