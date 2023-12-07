const AuthModel = require('../models/phonelogin');

exports.managePhoneNumber = async (req, res) => {
  try {
    const { phone } = req.body;
    console.log('phoneNumber', phone);

    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required in the request body.' });
    }
    const result = await AuthModel.sendVerificationCode(phone);

    if (result.success) {
      return res.status(201).json({ message: 'Phone number saved successfully.' });
    } else {
      return res.status(500).json({ message: 'Failed to send verification code.' });
    }
  } catch (error) {
    console.error('Error in phoneController:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
