# Simpson Says REST API
## For Live Server Usage
### [Documentation on Usage of Rest API](http://simpsonsaysapidocs.surge.sh)
## **For Running Locally**

All dependencies have been linked through packages attached
1. To link and install all dependencies
    * in root run `yarn install`
    
1. Add and link .env file
    * add `.env` file to root directory
    * add required enviorment variables
        * `DB_ENV=development` to indicate Local DB used for development
        * `PORT=<port on local machine>` to indicate which port will be used to host the server on the local machine
        * `JWT_SECRET=<LONG string to be used for salting hashed passwords>` to create a unique secret string that is used to salt hashed passwords for security, and data integrity on token signatures

1. Fire up server
    * Migrate DB Tables
        * run `yarn knex migrate:latest`
    * Seed Data to DB tables
        * run `yarn knex seed:run`
    * Start server
        * run `yarn server`
            * This by default will initiate the server to run locally on the hosted port using the server listener, and the development DataBase as Well as default seeded data.
    