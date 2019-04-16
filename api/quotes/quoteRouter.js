const express = require('express');
const router = express.Router();
const db = require('./quoteModel');

// GET - existing list of favorite quotes
router.get('/favorites', async (req, res) => {
	try {
		const favorites = await db.getFavorites();
		res.status(200).json(quotes);
	} catch (error) {
		res.status(500).json({ errorMessage: 'Cannot retrieve favorites.' });
	}
});

// POST - new favorite quote to existing list
router.post('/favorites', async (req, res) => {
	const newFaveQuote = req.body;
	if (!newFaveQuote.quotes || !newFaveQuote.char) {
		res.status(400).json({ errorMessage: 'Quote and character require to add to favorites.' });
	} else {
		try {
			const newFaveQuote = await db.addQuote(newFaveQuote);
			res.status(201).json(newFaveQuote);
		} catch (error) {
			res.status(500).json({ errorMessage: 'Could not save quote to database.' });
		}
	}
});

// GET - '/search'
router.get('/search', async (req, res) => {
	try {
		const search = await db.getSearch();
		res.status(200).json(search);
	} catch (error) {
		res.status(500).json({ errorMessage: 'Cannot retrieve search param.' });
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
