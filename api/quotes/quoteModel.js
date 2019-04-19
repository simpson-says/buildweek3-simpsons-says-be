const db = require('../../data/dbConfig');

module.exports = {
	// get list of favorite quotes
	getFavorites: id => {
		return db('quotes').where('user_id', id).select('quote_id');
	},
	// add new quote to favorites
	addFavorite: newQuote => {
		return db('quotes').insert(newQuote);
	}
	// get search from user
	// getSearch: newSearch => {
	// 	return db('search');
	// }
};
