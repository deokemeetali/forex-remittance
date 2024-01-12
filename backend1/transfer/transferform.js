const OverseasTransferModel = require('../models/transfer');

exports.addOverseasTransfer = async (req, res) => {
  const transferData = req.body;

  try {
    const result = await OverseasTransferModel.addOverseasTransfer(transferData);

    if (result.success) {
      res.status(201).json({ message: 'Overseas transfer added successfully', transferDetails: result.transferDetails });
    } else {
      res.status(500).json({ error: 'Failed to add overseas transfer' });
    }
  } catch (error) {
    console.error('Error in adding overseas transfer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
