const request = require('supertest');
const server = require('../server/server');
const db = require('../../data/dbConfig');

describe('authRouter Tests', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });
    afterEach(async () => {
        await db('users').truncate();
    });

// POST - for user authorized user login - will get user creds
describe('/api/login POST', () => {
    describe('User now logged in.', () => {
        
        it('should res with status code 200', async () => {
        await request(server)
            .post('/api/register')
            .send({ username: 'userName', pw: 'xxxx' })
            .expect(200);
        return request(server)
            .post('/api/login')
            .send({ username: 'userName', pw:'xxxx' })
            .expect(200);
        });
    });
});
});

// POST - for new user registration - will add user to users db
describe('/api/register POST', () => {
    describe('User is now registered.', () => {
        
        // expected response
        it('should res with status code 200', () => {
            return request(server)
                .post('/api/register')
                .send({ username: "userName", pw:"xxxx" })
                .expect(200);
        });

        // success
        it("New user is now in db.", async () => {
            await request(server)
                .post('/api/register')
                .send({ username: 'userName2', pw: '1234' });
                    let users = await db('users').where({ username: 'userName2' });
                    expect(users.length).toBe(1);
        
            await request(server)
                .post('/api/register')
                .send({ username: 'userName3', password: 'abcd' });
                    let users = await db('users');
                    expect(users).toHaveLength(2);
            });
    });
});