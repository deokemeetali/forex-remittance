const { Pool } = require('pg')
const logger = require('../logger')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'dimple@1234',
    database: 'postgres'
});

async function connectToDatabase () {
  try {
    await pool.connect()
    logger.info('Connected to PostgreSQL database')
  } catch (error) {
    logger.error('Error connecting to PostgreSQL database:', error.message)
  }
}

module.exports = {
  pool, connectToDatabase
}
