import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orgs", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("country").notNullable();
    table.string("address");
    table.string("city");
    table.integer("paid_vacation_days");
    table.timestamp("validfrom").defaultTo(knex.fn.now());
    table.timestamp("validuntil").defaultTo("3000-12-01");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orgs");
}
