const TransactionModel = require('../models/TransactionModel');
exports.transactionAsync = async (req, res) => {
  const dataToSend = req.body;

  try {
    const result = await TransactionModel.createTransactionTable(dataToSend);

    if (result.success) {
      res.status(201).json({ message: 'Transaction added successfully', transaction: result.transaction });
    } else {
      res.status(500).json({ error: 'Failed to add transaction' });
    }
  } catch (error) {
    console.error('Error in adding transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};