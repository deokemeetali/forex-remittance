const { Pool } = require('pg')

const pool = new Pool({
<<<<<<< HEAD
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'dimple@1234',
    database: 'postgres'
});
=======
  host: 'localhost',
  user: 'postgres',
  port: 5000,
  password: 'sakshi',
  database: 'postgres'
})
>>>>>>> d465acc766581c988492829094b715f4f13f0b92

async function connectToDatabase () {
  try {
    await pool.connect()
    console.log('Connected to PostgreSQL database')
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error.message)
  }
}

module.exports = {
  pool, connectToDatabase
}
