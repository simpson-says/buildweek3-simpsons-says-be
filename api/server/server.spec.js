const request = require('supertest');
const server = require('./server.js');


describe('Server.js', () => {

    describe('Root Directory get', () => {
        it('should work', () => {
          return request(server)
            .get('/')
            .expect(200);
        });
        
        it('should return this text', () => {
          return request(server)
            .get('/')
            .then(res => {
              expect(res.text).toBe('Server Home directory GET is active.');
            });
        });
    
        it('should return text html', () => {
            return request(server)
              .get('/')
              .then(res => {
                expect(res.type).toBe('text/html');
              });
        });
    
    });
});