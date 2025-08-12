
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orgs').del()
  .then(function () {
    // Inserts seed entries
    return knex('orgs').insert([
    {
      name: "People Central",
      country: "Germany",
      address: "Sendstrase",
      paid_vacation_days: 30,
      city: "Dortmund",
      validfrom: "2025-01-06T23:00:00.000Z",
      validuntil: "3000-11-30T23:00:00.000Z"
    }
    ]);
  });
};