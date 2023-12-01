<<<<<<< HEAD
=======
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
`
>>>>>>> d465acc766581c988492829094b715f4f13f0b92

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
      
<<<<<<< HEAD
=======

>>>>>>> d465acc766581c988492829094b715f4f13f0b92

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

  async checkUserExistence(username, email) {
    try {
      const usernameQuery = 'SELECT COUNT(*) FROM users WHERE username = $1';
      const emailQuery = 'SELECT COUNT(*) FROM users WHERE email = $1';

      const usernameResult = await pool.query(usernameQuery, [username]);
      const emailResult = await pool.query(emailQuery, [email]);

      const usernameCount = parseInt(usernameResult.rows[0].count);
      const emailCount = parseInt(emailResult.rows[0].count);

      if (usernameCount > 0) {
        throw new Error('Username already exists');
      }

      if (emailCount > 0) {
        throw new Error('Email already exists');
      }

      return false; // Indicates that neither username nor email exists
    } catch (error) {
      console.error('Error checking user existence:', error);
      throw error; // Rethrow the error for further handling in the controller
    }
  }

  // You can add more methods for user-related operations here if needed
}

<<<<<<< HEAD
module.exports = User;
=======
module.exports = User
>>>>>>> d465acc766581c988492829094b715f4f13f0b92
