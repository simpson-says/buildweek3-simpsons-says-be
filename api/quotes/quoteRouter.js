const express = require('express');
const router = express.Router();
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
	try {
		// const favorites = await db.getFavorites(); // gets favorites existing in db
		// res.status(200).json(quotes); // OK status
		axios.post(`https://simpsonssays.herokuapp.com/getquote?input=${id}`)
			.then (result => {
				res.status(200).send(result.data);
		});
	} catch (error) { // catch all error
		res.status(500).json({ errorMessage: 'Cannot retrieve favorites.' }); // error
	}
});

// /addFavorite - adds a new favorite to the existing list of favorites - string - ID 
router.post('/favorites/:id', async (req, res) => {
	const { id } = req.params;
	const newFaveQuote = req.body; // var set to all favorites
	if (!newFaveQuote.quote || !newFaveQuote.char) {  // if missing quote or character portion of entry
		res.status(400).json({ errorMessage: 'Quote and character require to add to favorites.' });
	} else {
		try {
			const newFavorite = await db.addFavorite(newFaveQuote); // add new quote to db
			res.status(201).json(newFavorite); // OK status, quote added
		} catch (error) {
			res.status(500).json({ errorMessage: 'Could not save quote to database.' }); // error could not save quote
		}
	}
});

//search - gets user generated search - string
router.get('/search', async (req, res) => {
	try {
		// const search = await db.getSearch(); // searches database
		res.status(200).json(search); // OK status
		axios.post(`https://simpsonssays.herokuapp.com/api?quote=${searchString}`)
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
