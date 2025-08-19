import knex from 'knex'
import { knexConfig } from '../../knexfile'

const stage = process.env.NODE_ENV || 'dev'
const config = knexConfig[stage]
const db = knex(config)

export default db