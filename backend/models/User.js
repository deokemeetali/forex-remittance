
const { pool } = require('../database/db')

class User {
  async createUser (username, email, password) {
    const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )

    pool.query(createUserTableQuery)
      .then(() => console.log('Users table created successfully'))
      .catch(err => console.error('Error creating users table:', err))

    try {


class User {
  async createUser(username, email, password) {

    const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

pool.query(createUserTableQuery)
  .then(() => console.log('Users table created successfully'))
  .catch(err => console.error('Error creating users table:', err));
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      


      const createUserQuery = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
      `

      const newUserValues = [username, email, password]
      await pool.query(createUserQuery, newUserValues)
      return { success: true }
    } catch (error) {
      console.error('Error creating user:', error)
      return { success: false, error: 'Error creating user' }
    }
  }

  // You can add more methods for user-related operations here if needed
}

