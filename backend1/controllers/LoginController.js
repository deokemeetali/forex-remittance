const { findUser } = require('../models/userModel')
const logger = require('../logger')
const adminCredentials = {
  username:'admin',
  password:'admin123',
}
async function login (req, res) {
  const { identifier, password } = req.body

  try {
    if(identifier==adminCredentials.username && password==adminCredentials.password){
     res.status(200).json({message:'Admin login successful',user:{username:'admin',role:'admin'}})
    }else{
    const user = await findUser(identifier)

    if (!user) {
      return res.status(401).json({ message: 'Invalid credential' })
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    res.status(200).json({ message: 'Login successful', user:{username:user.username,role:'user'} });
  }
   }catch (error) {
    logger.error('Error during login:', error)
    res.status(500).json({ message: 'Error during login' })
  }
}

module.exports = { login }
