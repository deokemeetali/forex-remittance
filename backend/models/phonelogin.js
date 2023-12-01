// authModel.js

const admin = require('firebase-admin');
const {pool}=require('../database/db');


class AuthModel {
  static async sendVerificationCode(phone) {

    const createPhoneTableQuery = `
    CREATE TABLE IF NOT EXISTS phoneNumber (
      user_id SERIAL PRIMARY KEY,
      phone VARCHAR(20) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;
    pool.query(createPhoneTableQuery)
    .then(() => console.log('Phone table created successfully'))
    .catch(err => console.error('Error creating phone table'));

    try{
      const insertQuery = `
      INSERT INTO phoneNumber (phone)
      VALUES ($1)
      `;
      await pool.query(insertQuery,[phone]);
      return {success : true}
    }
    catch(error){
        return {success : false, error:'Error saving phone number'}
    }
  }
}

module.exports = AuthModel;