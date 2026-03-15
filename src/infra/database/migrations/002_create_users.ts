import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary()
    table.string("name", 150).notNullable().unique()
    table.string("email", 150).notNullable().unique()
    table.string("password", 255).notNullable()
    table
      .integer("role_id")
      .unsigned()
      .references("id")
      .inTable("roles")
      .notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users")
}