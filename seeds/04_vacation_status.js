
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('vacation_status').del()
  .then(function () {
    // Inserts seed entries
    return knex('vacation_status').insert([
	{
		id: 1,
		status: "PENDING"
	},
	{
		id: 2,
		status: "ACCEPTED"
	},
	{
		id: 3,
		status: "REJECTED"
	}
    ]);
  });
};