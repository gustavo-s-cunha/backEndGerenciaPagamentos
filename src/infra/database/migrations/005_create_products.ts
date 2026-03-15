import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("products", (table) => {
    table.uuid("id").primary()
    table.string("name", 150).notNullable()
    table.decimal("amount", 10, 2).defaultTo(0)
    table.decimal("price", 10, 2).defaultTo(0)
    table.timestamps(true, true)
  })
  await knex("products").insert([
    { id: crypto.randomUUID(), name: "Product 01", amount: 100, price: 500 },
    { id: crypto.randomUUID(), name: "Product 02", amount: 100, price: 250 },
  ])
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("products")
}