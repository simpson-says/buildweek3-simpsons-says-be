const db = require('../../data/dbConfig');

module.exports = {
	// get list of favorite quotes
	getFavorites: () => {
		return db('quotes');
	},

	// add new quote to favorites
	addQuote: newQuote => {
		return db('quotes').insert(quote);
	},
	// get search from user
	getSearch: newSearch => {
		return db('search');
	}

};