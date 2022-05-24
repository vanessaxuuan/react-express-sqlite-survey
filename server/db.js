import path from "path"
import { fileURLToPath } from "url"
import { createRequire } from "module"; // allow "require" to be used
const require = createRequire(import.meta.url);

// Get the location of database.sqlite file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.resolve(__dirname, 'storage/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// create table in database: 'Response'
knex.schema.hasTable("Response")
  .then((exists) => {
    if (!exists) {
      console.log(exists)
      return knex.schema.createTable("Response", (table) => {
        table.increments('id').primary()
        table.string('name')
        table.jsonb('colour')
        table.jsonb('prog_lang')
        table.jsonb('languages')
        table.jsonb("would_pay")
      }).then(() => {
        // Log success message
        console.log('Table \'Response\' created')
      })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // Log success message
    console.log('done')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// Just for debugging purposes:
// knex.select('*').from('Response')
// .then(data => console.log('data:', data))
// .catch(err => console.log(err))

// Export the database
export default knex
