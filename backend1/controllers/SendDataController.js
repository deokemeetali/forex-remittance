const { pool } = require('../database/db')
const sendData = (req, res) => {
  const {
    senderName,
    recipientName,
    amount,
    baseCurrency,
    targetCurrency,
    purpose,
    bankAccount,
    convertedAmount,
  } = req.body
  // Process the received form data here (you can perform database operations, send emails, etc.)
  console.log('Received form data:')
  console.log('Sender Name:', senderName)
  console.log('Recipient Name:', recipientName)
  console.log('Amount:', amount)
  console.log('Base Currency:', baseCurrency)
  console.log('Target Currency:', targetCurrency)
  console.log('Purpose:', purpose)
  console.log('Bank Account:', bankAccount)
  console.log('Converted Amount:', convertedAmount)

  res.status(200).json({ message: 'Form data received successfully!' })
}

//TRANSACTION LIST 

const getFormData = async (req, res) => {
  try {
    // Fetch form data from the PostgreSQL table
    const query = `
      SELECT *
      FROM form_data
    `;

    const result = await pool.query(query);

    // Send the data to the frontend
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { sendData, getFormData };

