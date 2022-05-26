const up = (myKnex) => {
  return myKnex.schema.createTable("question", (table) => {
    table.increments()
    table.string("question")
    table.string("type")
  })
  .createTable("choice", (table) => {
    table.increments()
    table.integer("question_id")
    table.string("option").defaultTo("text")
  })
}

const down = (myKnex) => {
  return myKnex.schema.dropTableIfExists("choice")
  .dropTableIfExists("question")
}

export {up, down} 
