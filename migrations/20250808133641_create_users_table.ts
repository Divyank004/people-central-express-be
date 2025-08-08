import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('username').notNullable();
    table.string('name').notNullable();
    table.string('location').notNullable();
    table.string('password').notNullable();
    table.date('date_of_birth');
    table.string('user_role');
    table.timestamp('last_login');
    table.integer('role_id').references('id').inTable('roles')
    table.integer('org_id').references('id').inTable('orgs')
    table.timestamp('validfrom').defaultTo(knex.fn.now())
    table.timestamp('validuntil').defaultTo('3000-12-01')
  })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

