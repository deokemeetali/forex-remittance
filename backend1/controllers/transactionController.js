const { pool } = require('../database/db');
const getTransactionHistory = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Transaction_history');
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    getTransactionHistory,
  };