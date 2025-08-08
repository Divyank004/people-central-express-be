import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('vacations', function(table) {
        table.increments('id').primary();
        table.integer('employee_id').references('id').inTable('employees');
        table.integer('vacation_type_id').references('id').inTable('vacation_type');
        table.integer('req_status_id').references('id').inTable('vacation_status');
        table.integer('approved_by_user_id').references('id').inTable('vacations');
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
        table.timestamp('validfrom').defaultTo(knex.fn.now())
        table.timestamp('validuntil').defaultTo('3000-12-01')
  })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('vacations');
}

