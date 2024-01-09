// Import necessary modules
const fetch = require('node-fetch');

// Define your controller function
exports.getBankDetailsByIFSC = async (req, res) => {
  const { ifscCode } = req.params; 
  // Assuming you are passing IFSC code as a route parameter
  try {
    const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
    const data = await response.json();

    if (response.ok) {
      if (data && data.BANK) {
        res.json({
          bankDetails: {
            bankName: data.BANK,
            branch: data.BRANCH,
            address: `${data.ADDRESS}, ${data.CITY}, ${data.STATE}`
          }
        });
      } else {
        res.status(404).json({ message: 'Bank details not found for the entered IFSC code' });
      }
    } else {
      res.status(response.status).json({ message: `Failed to fetch bank details. Status: ${response.status}` });
    }
  } catch (error) {
    console.error('Error fetching bank details:', error);
    res.status(500).json({ message: 'Error fetching bank details. Please try again later.' });
  }
};
