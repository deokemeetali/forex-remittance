const express = require('express')
const cors = require('cors')
const { connectToDatabase } = require('./database/db')
const { pool } = require('pg')
const app = express()
const port = process.env.PORT || 5001

connectToDatabase()

app.use(cors())
app.use(express.json())

app.get('/message', (req, res) => {
  res.json({ message: 'Hello from server!' })
})
app.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body
    const query = 'SELECT * FROM users WHERE identifier = $1 AND password = $2'
    const result = await pool.query(query, [identifier, password])

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful!' })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ message: 'Error during login' })
  }
})
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
