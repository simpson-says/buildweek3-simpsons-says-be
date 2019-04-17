const request = require('supertest');
const server = require('../server/server');
const db = require('../../data/dbConfig');

describe('Authentication Router Tests', () => {
    beforeEach(async () => {
        await db('users').del();
    });
    afterEach(async () => {
        await db('users').del();
    });

    describe('/api/register POST', () => {
        describe('Successful Register', () => {
            
            it('should respond with status code 200', () => {
                return request(server)
                    .post('/api/register')
                    .send({ username: "George", password:"thisWouldBeHashed" })
                    .expect(200);
            });
    
            it("successfully adds a new user to the db", async () => {
                await request(server)
                  .post("/api/register")
                  .send({ username: "Lincoln", password: "password" });
                let users = await db("users");
                expect(users.length).toBe(1);
          
                await request(server)
                  .post("/api/register")
                  .send({ username: "Reagan", password: "america" });
                users = await db("users");
                expect(users).toHaveLength(2);
            });
        });
    });

    describe('/api/login POST', () => {
        describe('Successful login', () => {
            
            it('should respond with status code 200', async () => {
                return await request(server)
                        .post('/api/register')
                        .send({ username: "George", password:"thisWouldBeHashed" })
                        .expect(200)
                        .then(res => {
                            request(server)
                                .post('/api/login')
                                .send({ username: "George", password:"thisWouldBeHashed" })
                                .expect(200);
                        })
                        .catch(err => res.status(500).json({message:"Internal Server Error adding the new User"}))       
            });
    
            // it("successfully adds a new user to the db", async () => {
            //     await request(server)
            //       .post("/api/login")
            //       .send({ username: "Lincoln", password: "password" });
            //     let users = await db("users").where({ username: "Lincoln" });
            //     expect(users.length).toBe(1);
          
            //     await request(server)
            //       .post("/api/login")
            //       .send({ username: "Reagan", password: "america" });
            //     users = await db("users");
            //     expect(users).toHaveLength(2);
            //   });
        });
    });

});