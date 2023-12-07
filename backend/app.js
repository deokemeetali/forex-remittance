const admin = require('firebase-admin');
const AuthController = require('./firebase/phonecontroller');
const { connectToDatabase } = require('./database/db');
const phoneController = require('./firebase/phonecontroller');
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5001
const logger = require('./logger')
const UserController = require('./controllers/UserController')
const LoginController = require('./controllers/LoginController')
const PORT = process.env.PORT || 5001
const BeneficiaryForm = require('./benificiaryform/benificiaryform')

connectToDatabase()

app.use(cors())
app.use(express.json())
app.use(express.json());


app.get('/message', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

const userController = new UserController()

app.post('/v1/auth/firebase',phoneController.managePhoneNumber);
app.post('/signup', (req, res) => userController.signUp(req, res))
app.post('/login', LoginController.login)
app.post('/api/beneficiaries',BeneficiaryForm.beneficiaryasync)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
