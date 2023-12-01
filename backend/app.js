const express = require('express')
const cors = require('cors')
const { connectToDatabase } = require('./database/db')
// const { pool } = require('./database/db')
const app = express()
const port = process.env.PORT || 5001
const logger = require('./logger')
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

const userController = new UserController()

app.post('/signup', (req, res) => userController.signUp(req, res))
app.post('/login', LoginController.login)
app.listen(port, () => {
  logger.info(`Server is running on ${port}`)
})
