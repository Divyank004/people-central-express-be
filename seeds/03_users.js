
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
	{
		name : "Daniel",
		email : "daniel004@gmail.com",
		location : "Germany",
		username : "daniel004@gmail.com",
		password : "$argon2id$v=19$m=65536,t=3,p=4$+hqRQvC\/5rnltqQpPtZp8A$pk3W\/mNode6iDC6mCQCQ+s5biryV12vWVsuJoPItX7k",
		date_of_birth : "1998-11-12",
		user_role : "EMPLOYEE",
		last_login : null,
		role_id: 2,
		validfrom : "2025-01-07",
		validuntil: "3000-01-07",
		org_id : 1
	},
	{
		name : "HR",
		email : "divyank005@gmail.com",
		location : "Germany",
		username : "divyank005@gmail.com",
		password : "$argon2id$v=19$m=65536,t=3,p=4$KLrGK7Mrk64iKvhiisy+OA$Zg6\/ghj8UzmGoSGAIk5gKHgMcffEGY1R4+kDuJZdfmU",
		date_of_birth : "1996-02-11",
		user_role : "HR",
		last_login : null,
		role_id: 1,
		validfrom : "2025-01-07",
		validuntil: "3000-01-07",
		org_id : 1
	},
	{
		name : "Divyank Dhadi",
		email : "divyank004@gmail.com",
		location : "Germany",
		username : "divyank004@gmail.com",
		password : "$argon2id$v=19$m=65536,t=3,p=4$+hqRQvC\/5rnltqQpPtZp8A$pk3W\/mNode6iDC6mCQCQ+s5biryV12vWVsuJoPItX7k",
		date_of_birth : "1993-06-22",
		user_role : "EMPLOYEE",
		last_login : null,
		role_id: 2,
		validfrom : "2025-01-07",
		validuntil: "3000-01-07",
		org_id : 1
	},
	{
		name : "Josef",
		email : "josef004@gmail.com",
		location : "Germany",
		username : "josef004@gmail.com",
		password : "$argon2id$v=19$m=65536,t=3,p=4$+hqRQvC\/5rnltqQpPtZp8A$pk3W\/mNode6iDC6mCQCQ+s5biryV12vWVsuJoPItX7k",
		date_of_birth : "1984-06-22",
		user_role : "ADMIN",
		last_login : null,
		role_id: 1,
		validfrom : "2025-01-07",
		validuntil: "3000-01-07",
		org_id : 1
	}
    ]);
  });
};