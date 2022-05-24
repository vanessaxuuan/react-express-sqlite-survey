import myKnex from "../db/knex.js"
/**
 * Base route: "http://localhost:3500/questions"
 */

// Retrieve all responses: /responses
const allResponses = async (req, res) => {
  myKnex("responses")
    .join("colour", "responses.id", "colour.id")
    .join("prog_lang", "responses.id", "prog_lang.id")
    .join("languages", "responses.id", "languages.id")
    .join("would_pay", "responses.id", "would_pay.id")
    .then(userData => {
      res.json(userData)
    })
}

// Retrieve a response: /responses/:id
const getResponse = async (req, res) => {
  let { id } = req.params;
  const _id = Number(id);
  myKnex('responses')
    .join("colour", "responses.id", "colour.id")
    .join("prog_lang", "responses.id", "prog_lang.id")
    .join("languages", "responses.id", "languages.id")
    .join("would_pay", "responses.id", "would_pay.id")
    .where('responses.id', _id) // select all records with :id
    .then(userData => {
      res.json({ userData })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving responses: ${err}` })
    })
}

// Update a response: /responses/:id
const updateResponse = async (req, res) => {
  let { id } = req.params;
  const _id = Number(id);
  myKnex('responses')
    .where('id', _id + 1) // select all records
    .update(req.body)
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving responses: ${err}` })
    })
}

// Create new response: /responses
const createResponse = async (req, res) => {
  myKnex.transaction(async trx => {
    try {
      await trx("responses")
        .insert({
          'name': req.body.name
          }).then(() => {
            return trx("colour").insert({
              'blue': req.body.colour.blue,
              'red': req.body.colour.red,
              'green': req.body.colour.green,
              'yellow': req.body.colour.yellow,
              'purple': req.body.colour.purple,
              'pink': req.body.colour.pink
            })
          }).then(() => {
            return trx("languages").insert({
              'english': req.body.languages.english,
              'chinese': req.body.languages.chinese,
              'malay': req.body.languages.malay,
              'tamil': req.body.languages.tamil,
              'hindi': req.body.languages.hindi
            })
          }).then(() => {
            return trx("prog_lang").insert({
              'python': req.body.prog_lang.python,
              'java': req.body.prog_lang.java,
              'javascript': req.body.prog_lang.javascript,
              'ruby': req.body.prog_lang.ruby,
              'golang': req.body.prog_lang.golang
            })
          }).then(() => {
            return trx("would_pay").insert({
              'yes': req.body.would_pay.yes,
              'no': req.body.would_pay.no
            })
        })
      // console.log("Inserted 5 tables", typeof(req.body))
      // res.json("new response added")
    } catch (err) {
      console.log("one of the queries failed, transaction rolled back", err)
      res.send(err)
    }
  })
}

// Clear data
const resetData = async (req, res) => {
  myKnex
    .select('*') // select all 
    .from('responses')
    .truncate() // remove the selection
    .then(() => {
      res.json({ message: 'Responses cleared.' })
    })
    .catch(err => {
      res.json({ message: `There was an error resetting book list: ${err}.` })
    })
}

export default allResponses
export { createResponse, getResponse, updateResponse, resetData }