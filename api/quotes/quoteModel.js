const db = require('../../data/dbConfig');

module.exports = {
	// get list of favorite quotes
	getFavorites: () => {
		return db('quotes');
	},
	// add new quote to favorites
	addFavorite: newQuote => {
		return db('quotes').insert(newFavorite);
	},
	// get search from user
	getSearch: newSearch => {
		return db('search');
	}

};