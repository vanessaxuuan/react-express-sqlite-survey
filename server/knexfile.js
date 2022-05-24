export default {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './storage/dev.sqlite3'
    },
    migrations: {
      directory: "./db/migrations"
    },
    useNullAsDefault: true
  },

};
