[For Usage Docs](http://simpsonsaysapidocs.surge.sh/)

**For Cloning and Running Locally**

All dependencies have been linked through packages attached
1. To link and install all dependencies
    * in root run `yarn install`
    
1. Add and link .env file
    * add `.env` file to root directory
    * add required enviorment variables
        1. `DB_ENV=development` to indicate Local DB used for development
        1. PORT=`<port on local machine>` to indicate which port will be used to host the server on the local machine
        1. JWT_SECRET=`<LONG string to be used for salting hashed passwords>` to create a unique secret string that is used to salt hased passwords for security, and data integrity on token signatures

1. Fire up server
    1. Migrate DB Tables
        * run `yarn knex migrate:latest`
    1. Seed Data to DB tables
        * run `yarn knex seed:run`
    