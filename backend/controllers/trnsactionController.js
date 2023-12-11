const { pool } = require('../database/db')

exports.TransactionList = async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM remittance_table');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }