[For Usage Docs](http://simpsonsaysapidocs.surge.sh/)

**For Cloning and Running Locally**

All dependencies have been linked through packages attached
1. To link and install all dependencies
    * in root run `yarn install`
1. Fire up server
    1. Migrate DB Tables
        * run `yarn knex migrate:latest'
    2. Seed Data to DB tables
        * run `yarn knex seed:run`
    3. Add and link .env file
        * add `.env` file to root directory
            * add required enviorment variables
            *   * DB_ENV=development
            *   * PORT=`<port on local machine>`
            *   * JWT_SECRET=`<LONG string to be used for salting hashed passwords>`
    