exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("vacation_type")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("vacation_type").insert([
        {
          id: 1,
          type: "PAID",
          no_of_days: 30,
          org_id: 1,
        },
        {
          id: 2,
          type: "UNPAID",
          no_of_days: null,
          org_id: 1,
        },
        {
          id: 3,
          type: "SICK",
          no_of_days: null,
          org_id: 1,
        },
        {
          id: 4,
          type: "PARENTAL",
          no_of_days: null,
          org_id: 1,
        },
      ]);
    });
};
