
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('working_hours').del()
  .then(function () {
    // Inserts seed entries
    return knex('working_hours').insert([
	{
		no_hours_day: 8,
		no_hours_week: 40
	}
    ]);
  });
};