import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("teams", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("location");
    table.string("category");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("teams");
}
