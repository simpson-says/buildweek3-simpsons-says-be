const { authenticate, validateRole } = require('../../auth/authenticate');
const db = require('../../../data/dbConfig')
const axios = require('axios')

module.exports = server => {
    server.post('/favorites', authenticate, addFavorite);
    server.get('/favorites', authenticate, getFavorites);
  };

function addFavorite(req, res) {
    const favoriteQuote = req.body

    db('favorites')
        .insert(favoriteQuote)
        .then(favoriteAdded => res.status(200).json(Boolean(favoriteAdded)))
        .catch(err => res.status(500).json({message:err}))
}

function getFavorites(req, res) {
    const userID = req.decoded.id

    db('favorites')
        .where({ userID })
        .then(favorites => res.status(200).json([favorites.quoteID]))
        .catch(err => res.status(500).json({message:err}))
}

