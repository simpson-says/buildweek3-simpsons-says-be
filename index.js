// code away!
require('dotenv').config();

const server = require('./api/server/server.js');

const port = process.env.PORT;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));