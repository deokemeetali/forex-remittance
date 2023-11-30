const { findUser } = require('../models/userModel')

async function login (req, res) {
  const { identifier, password } = req.body

  try {
    const user = await findUser(identifier)

    if (!user) {
      return res.status(401).json({ message: 'Invalid credential' })
    }

    // Here, you should compare the hashed password from the database
    // with the incoming password using a secure password hashing method
    // For example, bcrypt.compare()

    // For demonstration purposes, a direct comparison is shown (NOT recommended for production)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    res.status(200).json({ message: 'Login successful', user })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ message: 'Error during login' })
  }
}

module.exports = { login }
