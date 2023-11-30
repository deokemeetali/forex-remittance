// models/User.js

const { pool } = require('../database/db');
const bcrypt = require('bcrypt');

class User {
  async createUser(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const createUserQuery = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
      `;

      const newUserValues = [username, email, hashedPassword];
      await pool.query(createUserQuery, newUserValues);
      return { success: true };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: 'Error creating user' };
    }
  }

  // You can add more methods for user-related operations here if needed
}

module.exports = User;
