import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("clients", (table) => {
    table.uuid("id").primary()
    table.string("name", 150).notNullable()
    table.string("email", 150).unique()
    table.timestamps(true, true)
  })
  await knex("clients").insert([
    { id: crypto.randomUUID(),
      name:"tester",
      email:"tester@email.com"
    }
  ])
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("clients")
}