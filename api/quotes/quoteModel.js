const db = require('../data/dbConfig');

module.exports = {
	// get list of favorite quotes
	getFavorites: () => {
		return db('favorites');
	},

	// add new quote to favorites
	addQuote: newQuote => {
		return db('favorites').insert(quote);
	},

	// get generated quote based on chosen character
	getGenQuote: id => {
		return db('genQuote');
	},

};


// getQuotes: id => {
// 	return db('quotes').where({ id: Number(id) }).select('id', 'quote', 'character');
// },