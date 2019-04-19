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


describe('server.js', () => {

    describe('Root GET', () => {
        it('should res as working', () => {
          return request(server)
            .get('/')
            .expect(200);
        });
        
        it('should res with text', () => {
          return request(server)
            .get('/')
            .then(res => {
              expect(res.text).toBe('Server GET running.');
            });
        });
    
        it('should res with text/html', () => {
            return request(server)
              .get('/')
              .then(res => {
                expect(res.type).toBe('text/html');
              });
        });
    
    });
});