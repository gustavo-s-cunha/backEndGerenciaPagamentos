import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("gateways", (table) => {
    table.uuid("id").primary()
    table.string("name", 100).notNullable()
    table.boolean("is_active").defaultTo(true)
    table.integer("priority").defaultTo(1)
    table.timestamps(true, true)
  })
  await knex("gateways").insert([
    { id: crypto.randomUUID(), name: "gateway 1", is_active: true, priority: 1 },
    { id: crypto.randomUUID(), name: "gateway 2", is_active: true, priority: 2 }
  ])
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("gateways")
}