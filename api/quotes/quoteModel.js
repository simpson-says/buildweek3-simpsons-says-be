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

	// get generated quote based on chosen character
	getGenQuote: id => {
		return db('quotes');
	},

};


// '/search' will go directly between FE and DS