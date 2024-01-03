const { Pool } = require('pg')
const logger = require('../logger')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'Shruti88@',
  database: 'postgres'
})
async function connectToDatabase () {
  try {
    const client = await pool.connect()
    logger.info('Connected to PostgreSQL database')
    client.release() // Release the client after successful connection
  } catch (error) {
    logger.error('Error connecting to PostgreSQL database:', error)
  }
}

module.exports = {
  pool,
  connectToDatabase
}
