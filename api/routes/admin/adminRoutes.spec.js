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


    describe.skip('Update User', () => {
        describe('Success', () => {
            it('should respond with status code 200', async () => {
                const response = await request(server)
                    .post('/api/register')
                    .send({ username: "George", password:"thisWouldBeHashed" })

                await request(server)
                    .post('/api/admin/users/1')
                    .send({ username: "frank", role:"team lead" })
                    .expect(response.updated).toEqual({ updated: true })
            });
        });
    });

    describe('Delete User', () => {
        
    });
});