const { authenticate, validateRole } = require('../../auth/authenticate');
const db = require('../../../data/dbConfig')
const axios = require('axios')

module.exports = server => {
    server.post('/users/favorites', authenticate, addFavorite);
    server.post('/users/search', authenticate, searchDeepBE);
    server.get('/users/favorites', authenticate, getFavorites);
  };


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
* @api {post} /api/Users/favorites Add User Favorite
* @apiName Post-Favorites
* @apiGroup Users
* @apiDescription This endpoint is open to all users to add a favorite quote to our DB for querying.
* @apiPermission Users
*
* @apiParam {Object} Quote             Request Object
* @apiParam {Number} Quote.quoteID     ID number of the quote to Favorite
* 
* @apiParamExample {json} Input 
*     {
*       "quoteID": 15
*     }
*
* 
* @apiSuccess {Object}  Response             Response Object
* @apiSuccess {Boolean} Response.Favorite    Boolean Value Indicating successful User Update
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*    {
*      "Favorite-Added": true,
*    }
*
*
*
* @apiError 500 Failed to submit one or more REQUIRED field
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 500 Internal Server Error
*     {
*        message: "Internal Server Error, failed to add favorite for User."
*     }
*/

function addFavorite(req, res) {
    const favoriteQuote = req.body

    db('favorites')
        .insert(favoriteQuote)
        .then(favoriteAdded => res.status(200).json(Boolean(favoriteAdded)))
        .catch(error => res.status(500).json({message:"Internal Server Error, failed to add favorite for User.", error}))
}

/**
* @api {get} /api/users/favorites Get All User favorites
* @apiName Get-Favorites
* @apiDescription This Endpoint is used by all users to retrieve list of favorite quotes.
* @apiPermission Users
*
* @apiGroup Users
* 
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     [
*       
*     ] 
*
* @apiSuccess {Array}   Qoutes        Array of favorite Quotes 
*
* @apiError 500    Error Sending out Favorites list for query
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 500 Bad Request
*     {
*       "message": "Error Sending out Favorites list for query"
*     }
*/

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

