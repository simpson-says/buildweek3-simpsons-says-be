const request = require('supertest');
const server = require('./server.js');

const users = [
	{
		id: 1,
		name: 'userName',
		pw: 'password'
	}
];

const quotes = [
	{
		id: 1,
		title: 'quoteTitle',
		content: 'quoteContent'
	}
];
