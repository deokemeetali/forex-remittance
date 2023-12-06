// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const BeneficiaryModel = require('./BeneficiaryModel'); // Adjust the path based on your project structure

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/beneficiaries', async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
