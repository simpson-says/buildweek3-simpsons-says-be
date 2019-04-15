require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT;
server.listen(port, () => console.log(`\n** server is running on port ${port} **\n`));
