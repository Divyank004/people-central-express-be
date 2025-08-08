import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('timesheets', function(table) {
        table.increments('id').primary();
        table.integer('employee_id').references('id').inTable('employees');
        table.date('working_date').notNullable();
        table.timestamp('start_time').notNullable();
        table.timestamp('end_time').notNullable();
        table.timestamp('validfrom').defaultTo(knex.fn.now())
        table.timestamp('validuntil').defaultTo('3000-12-01')
  })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('timesheets');
}

