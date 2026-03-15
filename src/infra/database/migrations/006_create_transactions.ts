import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary()
    table
      .uuid("id_client")
      .references("id")
      .inTable("clients")
      .notNullable()
    table.string("gateway", 50)
    table.string("external_id")
    table.string("status", 50)
    table.string("type", 50)
    table.decimal("amount", 10, 2)
    table.string("card_last_numbers", 4)
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("transactions")
}