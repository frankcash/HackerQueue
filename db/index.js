const { Pool } = require('pg')

// const pool = new Pool()
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}