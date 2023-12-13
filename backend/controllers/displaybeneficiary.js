const { pool } = require('../database/db');

exports.beneficiary = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM beneficiary'); // Use 'beneficiary' instead of 'beneficiaries'
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
