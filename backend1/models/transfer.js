const { pool } = require('../database/db');

class OverseasTransferModel {
  static async addOverseasTransfer(transferData) {
    const createTransferTableQuery = `
      CREATE TABLE IF NOT EXISTS overseas_transfer (
        transfer_id SERIAL PRIMARY KEY,
        sender_name VARCHAR(80),
        recipient_name VARCHAR(80),
        amount NUMERIC,
        base_currency VARCHAR(10),
        target_currency VARCHAR(10),
        purpose TEXT,
        bank_account VARCHAR(255),
        converted_amount NUMERIC,
        country VARCHAR(80),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      // First, create the table if it doesn't exist
      await pool.query(createTransferTableQuery);
      console.log('Overseas Transfer table created successfully');

      const insertQuery = `
        INSERT INTO overseas_transfer (sender_name, recipient_name, amount, base_currency, target_currency, purpose, bank_account, converted_amount, country)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;

      const {
        senderName,
        recipientName,
        amount,
        baseCurrency,
        targetCurrency,
        purpose,
        bankAccount,
        convertedAmount,
        country
      } = transferData;

      const result = await pool.query(insertQuery, [
        senderName,
        recipientName,
        amount,
        baseCurrency,
        targetCurrency,
        purpose,
        bankAccount,
        convertedAmount,
        country
      ]);

      return { success: true, transferDetails: result.rows[0] };
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: 'Error adding overseas transfer' };
    }
  }
}

module.exports = OverseasTransferModel;
