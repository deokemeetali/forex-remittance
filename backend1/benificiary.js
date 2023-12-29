// BeneficiaryModel.js
const { pool } = require('../database/db')

class BeneficiaryModel {
  static async addBeneficiary (formData) {
    const createBeneficiaryTableQuery = `
        CREATE TABLE IF NOT EXISTS beneficiary (
          user_id SERIAL PRIMARY KEY,
          country_name VARCHAR(80),
          address VARCHAR(255),
          email VARCHAR(255) NOT NULL,
          phone_number VARCHAR(20) UNIQUE NOT NULL,
          bank_name VARCHAR(255),
          account_number VARCHAR(255),
          branch VARCHAR(255),
          ifsc_code VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )    `
    try {
      // First, create the table
      await pool.query(createBeneficiaryTableQuery)
      console.log('Beneficiary table created successfully')
      const insertQuery = `
          INSERT INTO beneficiary (country_name, address, email, phone_number, bank_name, account_number, branch, ifsc_code)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (phone_number) DO NOTHING
          RETURNING *
       `
      const {
        country_name,
        address,
        email,
        phoneNumber,
        bankName,
        accountNumber,
        branch,
        ifscCode
      } = formData

      const result = await pool.query(insertQuery, [
        country_name,
        address,
        email,
        phoneNumber,
        bankName,
        accountNumber,
        branch,
        ifscCode
      ])

      return { success: true, beneficiary: result.rows[0] }
    } catch (error) {
      console.error('Error:', error)
      return { success: false, error: 'Error adding beneficiary' }
    }
  }
}

module.exports = BeneficiaryModel
