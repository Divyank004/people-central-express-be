import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     return knex.schema.createTable('vacation_status', function(table) {
        table.integer('id').primary();
        table.string('status').notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('vacation_status');

}

