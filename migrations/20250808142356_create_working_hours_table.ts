import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     return knex.schema.createTable('working_hours', function(table) {
        table.increments('id').primary();
        table.integer('no_hours_day').notNullable();
        table.integer('no_hours_week').notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('working_hours');
}

