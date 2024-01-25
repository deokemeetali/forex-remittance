const { pool } = require('../database/db');

const getTransactionHistory = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'Admin') {
      // Admin can see all transactions
      query = 'SELECT * FROM Transaction_history';
    } else {
      // Normal user can only see their own transactions
      query = 'SELECT * FROM Transaction_history WHERE user_id = $1';
    }

    const result = await pool.query(query, [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getTransactionHistory,
};
