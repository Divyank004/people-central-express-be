exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("vacations")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("vacations").insert([
        {
          start_date: "2025-04-02",
          end_date: "2025-04-03",
          vacation_type_id: 2,
          req_status_id: 2,
          employee_id: 2,
          validfrom: "2025-04-01T22:00:00.000Z",
          validuntil: "3000-02-11T23:00:00.000Z",
          approved_by_user_id: 2,
        },
        {
          start_date: "2025-03-03",
          end_date: "2025-03-07",
          vacation_type_id: 1,
          req_status_id: 2,
          employee_id: 2,
          validfrom: "2025-02-11T23:00:00.000Z",
          validuntil: "3000-02-11T23:00:00.000Z",
          approved_by_user_id: 2,
        },
        {
          start_date: "2025-05-02",
          end_date: "2025-05-06",
          vacation_type_id: 3,
          req_status_id: 2,
          employee_id: 2,
          validfrom: "2025-05-02T22:00:00.000Z",
          validuntil: "3000-02-11T23:00:00.000Z",
          approved_by_user_id: 2,
        },
        {
          start_date: "2025-06-02",
          end_date: "2025-06-06",
          vacation_type_id: 1,
          req_status_id: 1,
          employee_id: 2,
          validfrom: "2025-05-02T22:00:00.000Z",
          validuntil: "3000-02-11T23:00:00.000Z",
          approved_by_user_id: 2,
        },
      ]);
    });
};
