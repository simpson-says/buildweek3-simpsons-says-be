const { authenticate, validateRole } = require('../../auth/authenticate');
const db = require('../../../data/dbConfig')
const axios = require('axios')

module.exports = server => {
    server.post('/users/favorites',authenticate, addFavorite);
    server.post('/users/search', searchDeepBE);
    server.post('/users/generate', generateQuote);
    server.get('/users/favorites', authenticate,  getFavorites);
  };

/**
* @api {post} /users/search     Search Database for Quotes
* @apiName Post-Search
* @apiGroup Users
* @apiDescription This endpoint is open to all users to Search for simpsons quotes using our algorithm, and returns a list of 10 Quotes from the DB.
* @apiPermission Users
*
* @apiParam {Object} Quote                 Request Object
* @apiParam {String} Quote.searchValue     String that will be used by the algorithm to search DB
* 
* @apiParamExample {json} Input 
*     {
*       "searchValue": "The Magic"
*     }
*
* 
* @apiSuccess {Array}   Response                              Array Housing 10 Quotes that match the searchValue
* @apiSuccess {Objects} Response.Quote                        Quote Object
* @apiSuccess {String}  Response.Quote.episode_title          Title of the quotes Episode
* @apiSuccess {Number}  Response.Quote.number_in_season       Which episode number in each season
* @apiSuccess {Number}  Response.Quote.quote_id               Quotes Unique ID
* @apiSuccess {String}  Response.Quote.raw_character_text     Character speaking the quote
* @apiSuccess {Number}  Response.Quote.season                 Season the quote is from
* @apiSuccess {String}  Response.Quote.spoken_words           The quote
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
* [
*   {
*    'episode_title': 'Homer Defined',
*    'number_in_season': 5,
*    'quote_id': 12037,
*    'raw_character_text': 'Homer Simpson',
*    'season': 3,
*    'spoken_words': 'Thanks, Magic.'
*  },
*  {
*    'episode_title': 'A Tale of Two Springfields',
*    'number_in_season': 2,
*    'quote_id': 71922,
*    'raw_character_text': 'Homer Simpson',
*    'season': 12,
*    'spoken_words': 'Magic Bus!'
*  },
*  {
*    'episode_title': 'The Great Money Caper',
*    'number_in_season': 7,
*    'quote_id': 73298,
*    'raw_character_text': 'Homer Simpson',
*    'season': 12,
*    'spoken_words': "Oh, right, the magic. The magic was great. It's really... the way to go."
*  },
*  {
*    'episode_title': 'Treehouse of Horror XII',
*    'number_in_season': 1,
*    'quote_id': 78098,
*    'raw_character_text': 'Lisa Simpson',
*    'season': 13,
*    'spoken_words': "This isn't my wand. It's a Twizzler!"
*  },
*  {
*    'episode_title': 'The Italian Bob',
*    'number_in_season': 8,
*    'quote_id': 104620,
*    'raw_character_text': 'Homer Simpson',
*    'season': 17,
*    'spoken_words': "I know, and he's magic!"
*  },
*  {
*    'episode_title': 'Elementary School Musical',
*    'number_in_season': 1,
*    'quote_id': 130924,
*    'raw_character_text': 'Kurt Hardwick',
*    'season': 22,
*    'spoken_words': 'The magic of art.'
*  },
*  {
*    'episode_title': 'The Fight Before Christmas',
*    'number_in_season': 8,
*    'quote_id': 132714,
*    'raw_character_text': 'Martha Stewart',
*    'season': 22,
*    'spoken_words': "Well, thanks for wasting my time. I'll just wave my magic wand and turn everything back the way it was!"
*  },
*  {
*    'episode_title': 'The Fight Before Christmas',
*    'number_in_season': 8,
*    'quote_id': 132715,
*    'raw_character_text': 'Marge Simpson',
*    'season': 22,
*    'spoken_words': 'You have a magic wand?'
*  },
*  {
*    'episode_title': 'The Book Job',
*    'number_in_season': 6,
*    'quote_id': 137953,
*    'raw_character_text': 'Seymour Skinner',
*    'season': 23,
*    'spoken_words': "But it's actually magic!"
*  
*  },
*  {
*   'episode_title': 'White Christmas Blues',
*   'number_in_season': 8,
*   'quote_id': 150568,
*   'raw_character_text': 'Bart Simpson',
*   'season': 25,
*   'spoken_words': 'And wand.'
*   }
* ]
*
*
* @apiError 500 Failed to submit one or more REQUIRED field
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 500 Internal Server Error
*     {
*        message: "Error Sending out search String for query."
*     }
*/

function searchDeepBE(req, res) {
    
    axios.post(`https://simpsonssays.herokuapp.com/api?quote=${req.body.searchValue}`)
        .then(deepBERes => { 
            res.status(200).json(deepBERes.data)
        })
        .catch(error => res.status(500))
    
}

/**
* @api {post} /users/generate    Generate AI quotes
* @apiName Post-Generate
* @apiGroup Users
* @apiDescription This endpoint is open to all users to generate random quotes given a character using AI 
*    and returns a list of 10 AI generated Quotes.
*
* @apiPermission Users
*
* @apiParam {Object} Quote                 Request Object
* @apiParam {String} Quote.genChar         Character from the Approved list
* 
* @apiParamExample {json} Input 
*     {
*       "genChar": "bart"
*     }
*
* 
* @apiSuccess {Array}   Response                              Array Housing 10 Quotes that match the searchValue
* @apiSuccess {Objects} Response.Quote                        Quote Object
* @apiSuccess {String}  Response.Quote.charname               Character name 
* @apiSuccess {String}  Response.Quote.quote                  The generated quote
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*  [
*    {
*      "quote": "i love a lot of them but i was being idea."
*    },
*    {
*      "quote": "(thoughtful) oh. i made a new fight. i'm just a little baby"
*    },
*    {
*      "quote": "a lot of it just turned the job from."
*    },
*    {
*      "quote": "(chuckles) okay in your heart... and i've been hearing about it."
*    },
*    {
*      "quote": "(earnest) i can't believe a thousand dollars of a bit faith."
*    },
*    {
*      "quote": "i can't believe it. (exasperated sound) get 'em"
*    },
*    {
*      "quote": "(shrugs) i don't have a lot of hearing about the time."
*    },
*    {
*      "quote": "the guys who wrote something better like this or lose a good dog."
*    },
*    {
*      "quote": "(shouts) it's the first thing you're take care!"
*    },
*    {
*      "quote": "(horrified) a kid killed an axe. (shudders) but"
*    }
* ]
*
*
* @apiError 404 That character can not be used to generate a quote, please select another from the list.
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 404 Internal Server Error
*     {
*        message: "That character can not be used to generate a quote, please select another from the list.",
*        list:[
*           'homer', 
*           'marge', 
*           'bart', 
*           'lisa', 
*           'moe', 
*           'grampa', 
*           'skinner'
*       ]
*     }
*/

function generateQuote(req, res) {
    const acceptableInputs = ['homer', 'marge', 'bart', 'lisa', 'moe', 'grampa', 'skinner']
    const input = req.body.genChar

    acceptableInputs.includes(input)
        ? axios.post(`https://eat-my-shorts.herokuapp.com/gen?input=${input}`)
            .then(deepBERes => { 
                res.status(200).json(deepBERes.data.map(genQuote => ({quote:genQuote.quote})))
            })
            .catch(error => res.status(500).json({message: "Failed to generate Quote", error}))
        : res.status(404).json({message: "That character can not be used to generate a quote, please select another from the list.", list:acceptableInputs})
    
}

/**
* @api {post} /Users/favorites Add User Favorite
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
* @apiSuccess {Boolean} Response.Favorite    Boolean Value Indicating successful User Update of Favorites stored in the DB(this toggles the favorite on and off when used)
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*    {
*      "Favorite-Modified": true,
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
    const favoriteQuote = { quoteID: req.body.quoteID, userID: req.decoded.id }
    console.log(favoriteQuote);

    db('favorites').where({userID: favoriteQuote.userID, quoteID: favoriteQuote.quoteID}).del()
    .then(delRes =>  Boolean(delRes) 
        ? res.status(200).json({"Favorite-Modified": Boolean(delRes)}) 
        :  db('favorites')
            .insert(favoriteQuote)
            .then(favoriteAdded => res.status(200).json({"Favorite-Modified": Boolean(favoriteAdded)}))
            .catch(error => res.status(500).json({message:"Internal Server Error, failed to add favorite for User.", error})))
    .catch(err => res.json({ message: "Failed to Toggle Favorite", err}))
       
}

/**
* @api {get} /users/favorites Get All User favorites
* @apiName Get-Favorites
* @apiDescription This Endpoint is used by all users to retrieve list of favorite quotes.
* @apiPermission Users
*
* @apiGroup Users
* 
* @apiSuccess {Array}   Response                              Array of Quote objects
* @apiSuccess {Objects} Response.Quote                        Quote Object
* @apiSuccess {String}  Response.Quote.episode_title          Title of the quotes Episode
* @apiSuccess {Number}  Response.Quote.number_in_season       Which episode number in each season
* @apiSuccess {Number}  Response.Quote.quote_id               Quotes Unique ID
* @apiSuccess {String}  Response.Quote.raw_character_text     Character speaking the quote
* @apiSuccess {Number}  Response.Quote.season                 Season the quote is from
* @apiSuccess {String}  Response.Quote.spoken_words           The quote
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
* [
*  {
*    'episode_title': 'Simpsons Roasting on an Open Fire',
*    'number_in_season': 1,
*    'quote_id': 10,
*    'raw_character_text': 'Homer Simpson',
*    'season': 1,
*    'spoken_words': 'Pardon my galoshes.'},
*  {
*    'episode_title': 'Simpsons Roasting on an Open Fire',
*    'number_in_season': 1,
*    'quote_id': 20,
*    'raw_character_text': 'Bart Simpson',
*    'season': 1,
*    'spoken_words': '"JINGLE BELLS, BATMAN SMELLS, ROBIN LAID AN EGG / THE BATMOBILE BROKE ITS WHEEL, THE JOKER GOT AWAY."'},
*  {
*    'episode_title': 'Bart the Genius',
*    'number_in_season': 2,
*    'quote_id': 555,
*    'raw_character_text': 'Sydney',
*    'season': 1,
*    'spoken_words': 'Anything you say.'
*  }
* ] 
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
            axios.post('https://eat-my-shorts.herokuapp.com/getquote',{ input: favorites.map(quote => quote.quoteID)})
                .then(deepBERes => {
                    res.status(200).json(deepBERes.data)
                })
                .catch(error => res.status(500).json({message: "Error Sending out Favorites list for query", error}))
        })
        .catch(error => res.status(500).json({message:"Failed to find that in our records", error}))
}

