const db = require('../data/dbConfig');

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
		return db('quotes').where({ quoteID: Number(id) }).select('id', 'quote', 'character');
	},

};


// getQuotes: id => {
// 	return db('quotes').where({ id: Number(id) }).select('id', 'quote', 'character');
// },