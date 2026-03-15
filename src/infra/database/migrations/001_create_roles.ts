import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("roles", (table) => {
    table.increments("id").primary()
    table.string("name", 100).notNullable().unique()
    table.string("description", 500)
    table.timestamps(true, true)
  })

  await knex("roles").insert([
    { name: "ADMIN", description: "Faz tudo" },
    { name: "MANAGER", description: "Pode gerenciar produtos e usuários" },
    { name: "FINANCE", description: "Pode gerenciar produtos e realizar reembolso" },
    { name: "USER", description: "Pode o resto que não foi citado" }
  ])
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("roles")
}