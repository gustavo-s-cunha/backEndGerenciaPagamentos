import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transaction_products", (table) => {
    table.increments("id").primary()
    table
      .uuid("transaction_id")
      .references("id")
      .inTable("transactions")
      .notNullable()
    table
      .uuid("product_id")
      .references("id")
      .inTable("products")
      .notNullable()
    table.integer("price").notNullable()
    table.integer("quantity").notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("transaction_products")
}