const stage = process.env.NODE_ENV || 'dev'
const config = require('../../knexfile')[stage]
const db = require('knex')(config)

export default db