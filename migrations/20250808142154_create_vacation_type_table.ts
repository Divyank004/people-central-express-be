import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('vacation_type', function(table) {
        table.increments('id').primary();
        table.string('type').notNullable();
        table.integer('no_of_days').notNullable();
        table.integer('org_id').references('id').inTable('orgs')
  })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('vacation_type');
}

