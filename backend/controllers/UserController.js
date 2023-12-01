// controllers/UserController.js
const logger = require('../logger')
const User = require('../models/User')

class UserController {
  constructor () {
    this.userModel = new User()
  }

 
  async signUp(req, res) {
    try {
      const { username, email, password } = req.body;
      await this.userModel.checkUserExistence(username, email);
      const result = await this.userModel.createUser(username, email, password);
      logger.info(result);
      if (result.success) {
        res.status(201).json({ message: 'User signed up successfully' });
      } else {
        res.status(500).json({ message: result.error });
      }
    } catch (error) {
      if (error.message === 'Username already exists' || error.message === 'Email already exists') {
        return res.status(400).json({ message: error.message });
      } else {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Error signing up user' });
      }
    }
  }
  // You can add more controller methods for user-related operations here if needed
}

module.exports = UserController;