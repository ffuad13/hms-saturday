/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
		table.increments('id').primary()
		table.string('firstname')
		table.string('lastname')
		table.string('email')
		table.string('username')
		table.string('password')
		table.string('roles')
		table.string('profilepict')
		table.timestamps()
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
