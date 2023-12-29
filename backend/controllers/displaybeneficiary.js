const { pool } = require('../database/db');

exports.beneficiary = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM beneficiary');
        console.log(rows);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
