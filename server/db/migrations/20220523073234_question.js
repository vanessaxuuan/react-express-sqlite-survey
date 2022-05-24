const up = (myKnex) => {
  return myKnex.schema.createTable("choice", (table) => {
    table.increments()
    table.integer("_id") 
    table.string("option").defaultTo("text")
  })
  .createTable("question ", (table) => {
    table.increments()
    table.string("question")
    table.string("type")
    table.string("value")
    table.integer("choice_id").references("_id").inTable("choice")
  })
}

const down = (myKnex) => {
  return myKnex.schema.dropTable("question")
}

export {up, down} 
