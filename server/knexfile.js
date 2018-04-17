// Update with your config settings.

module.exports = {
  development: {
    client: 'mariasql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: process.env.DB_PASSWORD || '',
      db: 'thankyous',
      charset: 'utf8'
    }
  },

  staging: {
    client: 'mariasql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: process.env.DB_PASSWORD || '',
      db: 'thankyous',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
