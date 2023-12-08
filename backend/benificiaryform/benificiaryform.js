const BeneficiaryModel = require('../models/benificiary');

exports.benificiaryasync = async(req, res) => {
  const formData = req.body;

  try {
    const result = await BeneficiaryModel.addBeneficiary(formData);

    if (result.success) {
      res.status(201).json({ message: 'Beneficiary added successfully', beneficiary: result.beneficiary });
    } else {
      res.status(500).json({ error: 'Failed to add beneficiary' });
    }
  } catch (error) {
    console.error('Error in adding beneficiary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
