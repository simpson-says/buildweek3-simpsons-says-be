const express = require('express');
const router = express.Router();
const axios = require('axios');

//search - gets user generated search - string
router.get('/search', async (req, res) => {
	const searchParam = req.query.search;
	try {
		axios
			.post(`https://eat-my-shorts.herokuapp.com/api?quote=${searchParam}`)
			.then(result => {
				res.status(200).send(result.data);
			})
			.catch(error => {
				res.status(400).send({ error: 'Cannot get search param.' });
			});
	} catch (error) {
		// catch all error
		res.status(500).json({ errorMessage: 'Cannot retrieve search param.' }); // error
	}
});

module.exports = router;
