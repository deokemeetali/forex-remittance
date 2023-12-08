// const admin = require('firebase-admin')
const { pool } = require('../database/db')

class AuthModel {
  static async sendVerificationCode (phone) {
    const createPhoneTableQuery = `
      CREATE TABLE IF NOT EXISTS phoneNumber (
        user_id SERIAL PRIMARY KEY,
        phone VARCHAR(20) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    try {
      await pool.query(createPhoneTableQuery)
      console.log('Phone table created successfully')

      // Now, insert data into the table with handling duplicates
      const insertQuery = `
        INSERT INTO phoneNumber (phone)
        VALUES ($1)
        ON CONFLICT (phone) DO NOTHING
      `
      await pool.query(insertQuery, [phone])

      return { success: true }
    } catch (error) {
      console.error('Error:', error)
      return { success: false, error: 'Error saving phone number' }
    }
  }
}

module.exports = AuthModel
