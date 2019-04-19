describe('Authentication Router Tests', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });
    afterEach(async () => {
        await db('users').truncate();
    });

    // ADD NEW USER - REGISTER
    describe('/api/register POST', () => {
        describe('Registerd', () => {
            
            it('should res with status code 200', () => {
                return request(server)
                    .post('/api/register')
                    .send({ 
                        username: 'user1', 
                        password:'hashedPW' 
                    })
                    .expect(200);
            });
            
    
            it('successfully adds new user to db', async () => {

                await request(server)
                  .post('/api/register')
                  .send({ 
                      username: 'user1', 
                      password: 'hashedPW' 
                    });
                let users = await db("users").where({ username: "user1" });
                expect(users.length).toBe(1);
          
                await request(server)
                  .post('/api/register')
                  .send({ 
                      username: 'user2', 
                      password: 'password' 
                    });
                users = await db('users');
                expect(users).toHaveLength(2);
              });
        });
    });

    // LOGIN TEST - POST
    describe('/api/login POST', () => {
        describe('Successful login', () => {
            
            it('should res with status code 200', async () => {
                await request(server)
                        .post('/api/register')
                        .send({ 
                            username: "userLogin", 
                            password:"hashedPW" 
                        })
                        .expect(200);
                    
                return request(server)
                        .post('/api/login')
                        .send({ 
                            username: "userLogin", 
                            password:"hashedPW" 
                        })
                        .expect(200);   
            });
    })
})
});