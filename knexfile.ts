
require('dotenv').config()
// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  dev: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_DEV_HOST,
      port: process.env.DB_DEV_PORT,
      database: process.env.DB_DEV_DBNAME,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASS
    },
     migrations: {
      tableName: 'knex_migrations',
      directory: "./migrations",
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_PROD_HOST,
      port: process.env.DB_PROD_PORT,
      database: process.env.DB_PROD_DBNAME,
      user: process.env.DB_PROD_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "./migrations",
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_PROD_HOST,
      port: process.env.DB_PROD_PORT,
      database: process.env.DB_PROD_DBNAME,
      user: process.env.DB_PROD_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "./migrations",
    }
  }
};
