const request = require('supertest');
const server = require('../server/server');
const db = require('../../data/dbConfig');

describe('Authentication Router Tests', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });
    afterEach(async () => {
        await db('users').truncate();5
    });

    describe('/api/register POST', () => {
        it('should respond with status code 200', () => {
            return request(server)
                .post('/api/register')
                .send({ username: "George", password:"thisWouldBeHashed" })
                .expect(200);
        });
    });
});