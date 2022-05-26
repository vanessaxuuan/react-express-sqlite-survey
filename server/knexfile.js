export default {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './storage/survey.sqlite3'
    },
    migrations: {
      directory: "./db/migrations"
    },
    useNullAsDefault: true
  },

};
