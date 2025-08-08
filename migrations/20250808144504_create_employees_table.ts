import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     return knex.schema.createTable('employees', function(table) {
        table.increments('id').primary();
        table.string('employee_role');
        table.string('currency');
        table.integer('salary');
        table.integer('no_vacations_days_left');
        table.integer('org_id').references('id').inTable('orgs')
        table.integer('user_id').references('id').inTable('users')
        table.integer('team_id').references('id').inTable('teams')
  })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('employees');
}

