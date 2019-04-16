const express = require('express');
const router = express.Router();
const db = require('./quoteModel');

// GET - existing list of favorite quotes
router.get('/favorites', async (req, res) => {
	try {
		const favorites = await db.get_faves();
		res.status(200).json(quotes);
	} catch (error) {
		res.status(500).json({ errorMessage: 'Cannot retrieve favorites.' });
	}
});

// POST - new favorite quote to existing list
router.post('/favorites', async (req, res) => {
	const newFaveQuote = req.body;
	if (!newFaveQuote.quote || !newFaveQuote.char) {
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

// GET generated quote based on chosen character
router.get('/generator', async (req, res) => {
	try {
		const genQuote = await db.favorites();
		res.status(200).json(genQuote);
	} catch (error) {
		res.status(500).json({ errorMessage: 'Cannot retrieve quote.' });
	}
});

// /search will go directly to FE
