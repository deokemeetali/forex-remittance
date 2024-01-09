const { Pool } = require('pg')
const logger = require('../logger')

const pool = new Pool({
  user: 'fintech_database_user',
  password: 'pl4rTweaehXwQRnavcrp2pGOemb77X5o',
  database: 'fintech_database',
  host: 'dpg-clkrmpsjtl8s73f17fq0-a.oregon-postgres.render.com',
  port: 5432,
  ssl: true

})
async function connectToDatabase () {
  try {
    const client = await pool.connect()
    logger.info('Connected to PostgreSQL database')
    client.release()
  } catch (error) {
    logger.error('Error connecting to PostgreSQL database:', error)
  }
}

module.exports = {
  pool,
  connectToDatabase
}
