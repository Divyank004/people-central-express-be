
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employees').del()
  .then(function () {
    // Inserts seed entries
    return knex('employees').insert([
	{
		employee_role: "Team Lead",
		salary: 120000,
		currency: "Euro",
		org_id: 1,
		user_id: 4,
		team_id: 1,
		no_vacation_days_left: 11
	},
	{
		employee_role: "Full Stack Developer",
		salary: 100000,
		currency: "Euro",
		org_id: 1,
		user_id: 3,
		team_id: 1,
		no_vacation_days_left: 12
	},
	{
		employee_role: "Frontend Developer",
		salary: 60000,
		currency: "Euro",
		org_id: 1,
		user_id: 1,
		team_id: 1,
		no_vacation_days_left: 25
	}
    ]);
  });
};