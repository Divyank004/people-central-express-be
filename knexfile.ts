import "dotenv/config";
// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const knexConfig: { [s: string]: import("knex").Knex.Config } = {
  dev: {
    client: "postgresql",
    connection: {
      host: process.env.DB_DEV_HOST,
      port: Number(process.env.DB_DEV_PORT),
      database: process.env.DB_DEV_DBNAME,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASS,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: process.env.DB_STAG_HOST,
      port: Number(process.env.DB_STAG_PORT),
      database: process.env.DB_STAG_DBNAME,
      user: process.env.DB_STAG_USER,
      password: process.env.DB_STAG_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: process.env.DB_PROD_HOST,
      port: Number(process.env.DB_PROD_PORT),
      database: process.env.DB_PROD_DBNAME,
      user: process.env.DB_PROD_USER,
      password: process.env.DB_PROD_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};
