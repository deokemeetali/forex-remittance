const { pool } = require('../database/db');

exports.beneficiary = async (req, res) => {

    const userId = req.user.id;
    console.log('userId:', userId);

    try {
        const result = await pool.query(`SELECT * FROM beneficiary WHERE user_id = $1`, [userId]); 
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
