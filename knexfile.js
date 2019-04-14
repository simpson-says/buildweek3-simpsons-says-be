// Update with your config settings.
const localPg = {
  host: 'localhost',
  database: 'productionDB',
  user: 'Omar',
  password: 'pass',
};

const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    useNullAsDefault: true,

    client: 'sqlite3',
    connection: {
      filename: './data/productionDB.db3',
    },

    migrations: {
      directory: './data/migrations',
    },

    seeds: {
      directory: './data/seeds',
    },

  },

  testing: {
    useNullAsDefault: true,

    client: 'sqlite3',
    connection: {
      filename: './data/testDB.db3',
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: productionDbConnection + "?ssl=true", // could be an object or a string
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};