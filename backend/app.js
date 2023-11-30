const express = require('express')
const cors = require('cors')
const { connectToDatabase } = require('./database/db')
// const { pool } = require('./database/db')
const app = express()
const port = process.env.PORT || 5001
// const bodyParser = require('body-parser')
const UserController = require('./controllers/UserController')
const LoginController = require('./controllers/LoginController')
// const bcrypt = require('bcrypt')
connectToDatabase()

app.use(cors())
app.use(express.json())

app.get('/message', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

// app.post('/login', async (req, res) => {
//   const { identifier, password } = req.body;

//   // Extract identifier and password from the request body

//   try {
//     const userQueryResult = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $1', [identifier]);

//     const user = userQueryResult.rows[0];
//     console.log(user)

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credential' });
//     }

//     // Here, you should compare the hashed password from the database
//     // with the incoming password using a secure password hashing method
//     // For example, bcrypt.compare()

//     // For demonstration purposes, a direct comparison is shown (NOT recommended for production)
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Error during login' });
//   }
// });

const userController = new UserController()

app.post('/signup', (req, res) => userController.signUp(req, res))
app.post('/login', LoginController.login)
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
