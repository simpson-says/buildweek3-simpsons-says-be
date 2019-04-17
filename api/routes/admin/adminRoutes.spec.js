const request = require('supertest');
const server = require('../../server/server');
const db = require('../../../data/dbConfig');

describe('Admin Router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });
    afterEach(async () => {
        await db('users').truncate();
    });


    describe('Update User', () => {
        describe('Success', () => {
            it('should respond with status code 200', async () => {
                const registerResponse = await request(server)
                                                .post('/api/register')
                                                .send({ username: "George", password:"thisWouldBeHashed" })
                    .expect(200);

                return request(server)
                    .post('/api/register')
                    .send({ username: "George", password:"thisWouldBeHashed" })
                    .expect(200);
            });
        });
    });

    describe('Delete User', () => {
        
    });
});