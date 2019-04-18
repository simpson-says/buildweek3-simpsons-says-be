const express = require('express');
const router = express.Router();
const authDb = require('../auth/authModel');
const db = require('./quoteModel');
const axios = require('axios');

/* /favorites - gets list of existing favorites - JSON array 

/addFavorite - adds a new favorite to the existing list of favorites - 
string - ID 

/search - gets user generated search - 
string 

/ STRETCH generator - generates new quote based on chosen character - string*/

// /favorites - gets existing favorites
router.get('/favorites', async (req, res) => { 
	const username = req.decoded.username;
	const user = await authDb.getUserByName({username});
	const user_id = user.id;
	const favoriteQuotes = await db.getFavorites(user_id);

	const inputObj = {
		input: [] 
	}

	favoriteQuotes.forEach(function(user_id) {
		inputObj.input.push(user_id.quote_id);
	});

	try {
		// const favorites = await db.getFavorites(); // gets favorites existing in db
		// res.status(200).json(quotes); // OK status
		axios.post('https://eat-my-shorts.herokuapp.com/getquote', inputObj)
			.then (result => {
				res.status(200).send(result.data);
			})
			.catch( (error) => {
				res.status(400).send({ error: 'Cannot get favorites.' });
			});
	} catch (error) { // catch all error
		res.status(500).json({ errorMessage: 'Cannot retrieve favorites.' }); // error
	}
});

// Favorite - adds a new favorite to the existing list of favorites - string - ID 
router.post('/favorites/:id', async (req, res) => {
	let favorite = null;
	try {
		const username = req.decoded.username;
		const user = await authDb.getUserByName({username});

		favorite = {
			quote_id: req.params.id, 
			user_id: user.id,
		};
		//res.status(201).json(user); // OK status, quote added
	} catch (error) {
		res.status(500).json({ errorMessage: 'Could find user information' });
	}

	 // var set to all favorites
	// if (!newFaveQuote.quote || !newFaveQuote.char) {  // if missing quote or character portion of entry
	// 	res.status(400).json({ errorMessage: 'Quote and character require to add to favorites.' });
	// } else {
	try {
		const newFavorite = await db.addFavorite(favorite); // add new quote to db
		res.status(201).json(newFavorite); // OK status, quote added
	} catch (error) {
		res.status(500).json({ errorMessage: 'Could not save quote to database.' }); // error could not save quote
	}
	// }
});

//search - gets user generated search - string
router.get('/search', async (req, res) => {
	const searchParam = req.query.search;
	try {
		axios.post(`https://eat-my-shorts.herokuapp.com/api?quote=${searchParam}`)
		.then (result => {
			res.status(200).send(result.data);
		})
		.catch( (error) => {
			res.status(400).send({ error: 'Cannot get search param.' });
		});
	} catch (error) { // catch all error
		res.status(500).json({ errorMessage: 'Cannot retrieve search param.' }); // error
	}
});


// // GET generated quote based on chosen character - STRETCH
// router.get('/generator', async (req, res) => {
// 	try {
// 		const genQuote = await db.getGenQuote();
// 		res.status(200).json(genQuote);
// 	} catch (error) {
// 		res.status(500).json({ errorMessage: 'Cannot retrieve quote.' });
// 	}
// });

module.exports = router;
