// const admin = require('firebase-admin')

const { connectToDatabase } = require('./database/db')
const phoneController = require('./firebase/phonecontroller')
const express = require('express')
const cors = require('cors')
const app = express()
// const logger = require('./logger')
const UserController = require('./controllers/UserController')
const LoginController = require('./controllers/LoginController')
const BeneficiaryForm = require('./benificiaryform/benificiaryform')
const Displaybeneficiary = require('./controllers/displaybeneficiary')
const sendDataController = require('./controllers/sendDataController')
const PORT = process.env.PORT || 5001

connectToDatabase()

app.use(cors())
app.use(express.json())

app.get('/message', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

const userController = new UserController()

app.post('/v1/auth/firebase', phoneController.managePhoneNumber)
app.post('/signup', (req, res) => userController.signUp(req, res))
app.post('/login', LoginController.login)

app.post('/api/beneficiaries', BeneficiaryForm.benificiaryasync)
app.post('/api/sendData', sendDataController.sendData)
// app.post('/api/sendData', (req, res) => {
//   const {
//     senderName,
//     recipientName,
//     amount,
//     baseCurrency,
//     targetCurrency,
//     purpose,
//     bankAccount,
//     convertedAmount
//   } = req.body

//   // Process the received form data here (you can perform database operations, send emails, etc.)
//   console.log('Received form data:')
//   console.log('Sender Name:', senderName)
//   console.log('Recipient Name:', recipientName)
//   console.log('Amount:', amount)
//   console.log('Base Currency:', baseCurrency)
//   console.log('Target Currency:', targetCurrency)
//   console.log('Purpose:', purpose)
//   console.log('Bank Account:', bankAccount)
//   console.log('Converted Amount:', convertedAmount)

//   // Respond with a success message
//   res.status(200).json({ message: 'Form data received successfully!' })
// })

app.post('/api/beneficiaries', BeneficiaryForm.benificiaryasync)
app.get('/api/displaybeneficiaries', Displaybeneficiary.beneficiary)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
