const { pool } = require('../database/db');

class TransactionModel {
  static async createTransactionTable(dataToSend) {
  
      const createTransactionTableQuery = `
        CREATE TABLE IF NOT EXISTS transaction_details (
          id SERIAL PRIMARY KEY,
          amount_sent DECIMAL,
          recipient_get VARCHAR(255),
          sender_country VARCHAR(255),
          recipient_country VARCHAR(255),
          card_holder_name VARCHAR(255),
          recipient_bank_name VARCHAR(255),
          recipient_email VARCHAR(255)
        );
      `;
      
 
    try {
        await pool.query(createTransactionTableQuery);
        console.log('Transaction table created successfully');
    
  
      const insertQuery = `
        INSERT INTO transaction_details (amount_sent, recipient_get, sender_country, recipient_country, card_holder_name, recipient_bank_name, recipient_email)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const {
        Amount_Send,
        Recipeint_get,
        selectedCountry1,
        selectedCountry2,
        cardHolderName,
        Recipeint_BankName,
        Recipeint_Email,
      } = dataToSend;

      const result = await pool.query(insertQuery, [
        Amount_Send,
        Recipeint_get,
        selectedCountry1,
        selectedCountry2,
        cardHolderName,
        Recipeint_BankName,
        Recipeint_Email,
      ]);

      return { success: true, transaction: result.rows[0] };
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: 'Error adding transaction' };
    }
  }
}

module.exports = TransactionModel;