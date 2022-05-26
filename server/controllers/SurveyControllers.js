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
      console.log("From server: retrieved ", userData)
      res.json({ userData })
    })
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
        })

      await trx("colour")
        .insert({
          'blue': req.body.colour.blue,
          'red': req.body.colour.red,
          'green': req.body.colour.green,
          'yellow': req.body.colour.yellow,
          'purple': req.body.colour.purple,
          'pink': req.body.colour.pink
        })
      await trx("languages")
        .insert({
          'english': req.body.languages.english,
          'chinese': req.body.languages.chinese,
          'malay': req.body.languages.malay,
          'tamil': req.body.languages.tamil,
          'hindi': req.body.languages.hindi
        })

      await trx("prog_lang")
        .insert({
          'python': req.body.prog_lang.python,
          'java': req.body.prog_lang.java,
          'javascript': req.body.prog_lang.javascript,
          'ruby': req.body.prog_lang.ruby,
          'golang': req.body.prog_lang.golang
        })
      await trx("would_pay")
        .insert({
          'yes': req.body.would_pay.yes,
          'no': req.body.would_pay.no
        }).then(() => {
          myKnex
            .table("responses")
            .count("id")
            .first()
            .then(total => res.json({
              message: "database updated",
              count: total
            }))
        })
    } catch (err) {
      console.log("one of the queries failed, transaction rolled back", err)
      res.send(err)
    }
  })
}

// Update a response: /responses/:id
const updateResponse = async (req, res) => {
  let { id } = req.params;
  const _id = Number(id);
  myKnex.transaction(async trx => {
    try {
      await trx("responses").where('id', _id)
        .update({
          'name': req.body.name
        })
      await trx("colour").where('id', _id)
        .update({
          'blue': req.body.blue,
          'red': req.body.red,
          'green': req.body.green,
          'yellow': req.body.yellow,
          'purple': req.body.purple,
          'pink': req.body.pink
        })
      await trx("languages").where('id', _id)
        .update({
          'english': req.body.english,
          'chinese': req.body.chinese,
          'malay': req.body.malay,
          'tamil': req.body.tamil,
          'hindi': req.body.hindi
        })

      await trx("prog_lang").where('id', _id)
        .update({
          'python': req.body.python,
          'java': req.body.java,
          'javascript': req.body.javascript,
          'ruby': req.body.ruby,
          'golang': req.body.golang
        })
      await trx("would_pay").where('id', _id)
        .update({
          'yes': req.body.would_pay.yes,
          'no': req.body.would_pay.no
        })
      res.json({ message: "database updated" })
    } catch (err) {
      console.log("one of the queries failed, transaction rolled back", err)
      res.send(err)
    }
  })
}

// Get number of responses: /responses/total/ids
const getIds = async (req, res) => {
  myKnex
    .select("id")
    .from("responses")
    .then(resp => {
      let flatten = resp.map(item => { return Object.values(item)[0] })
      res.json({data: flatten})
    }).catch(err => {
      res.json(err)
    })
}

// Delete a response: /responses/delete
const deleteResponse = async (req, res) => {
  let _id = req.body["curr_id"]
  myKnex("responses")
  .where("id", _id)
  .del()
  .then(() => res.json({message: "deleted"}))
}

export default allResponses
export { createResponse, getResponse, updateResponse, getIds, deleteResponse }