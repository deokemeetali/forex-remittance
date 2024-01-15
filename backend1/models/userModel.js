const { pool } = require('../database/db')

async function findUser (identifier) {
  try {
    const userQueryResult = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $1', [identifier])
    return userQueryResult.rows[0]
  } catch (error) {
    throw new Error(`Error finding user: ${error.message}`)
  }
}

module.exports = { findUser }
