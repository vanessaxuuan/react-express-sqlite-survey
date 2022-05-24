const up = (myKnex) => {
  return myKnex.schema.createTable("responses ", (table) => {
    table.increments()
    table.string("name")
  })
  .createTable("colour", (table) => {
    table.integer("id").references("id").inTable("responses")
    table.boolean("blue").defaultTo("false")
    table.boolean("red").defaultTo("false")
    table.boolean("green").defaultTo("false")
    table.boolean("yellow").defaultTo("false")
    table.boolean("purple").defaultTo("false")
    table.boolean("pink").defaultTo("false")
  })
  .createTable("prog_lang", (table) => {
    table.integer("id").references("id").inTable("responses")
    table.boolean("python").defaultTo("false")
    table.boolean("java").defaultTo("false")
    table.boolean("javascript").defaultTo("false")
    table.boolean("ruby").defaultTo("false")
    table.boolean("golang").defaultTo("false")
  })
  .createTable("languages ", (table) => {
    table.integer("id").references("id").inTable("responses")
    table.boolean("english").defaultTo("false")
    table.boolean("chinese").defaultTo("false")
    table.boolean("malay").defaultTo("false")
    table.boolean("tamil").defaultTo("false")
    table.boolean("hindi").defaultTo("false")
  })
  .createTable("would_pay ", (table) => {
    table.integer("id").references("id").inTable("responses")
    table.boolean("yes").defaultTo("false")
    table.boolean("no").defaultTo("false")
  })
}

const down = (myKnex) => {
  return myKnex.schema.dropTable("responses")
}

export {up, down} 
