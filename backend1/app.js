// const admin = require('firebase-admin')

const { connectToDatabase } = require('./database/db')
const phoneController = require('./firebase/phonecontroller')
const express = require('express')
const cors = require('cors')
const app = express()
const UserController = require('./controllers/UserController')
const LoginController = require('./controllers/LoginController')
const BeneficiaryForm = require('./benificiaryform/benificiaryform')
const Displaybeneficiary = require('./controllers/displaybeneficiary')
const sendDataController = require('./controllers/SendDataController')
const ChartControllerD   = require('./controllers/ChartController')
const bankDetails = require('./controllers/ifscControllers')
const transactionController = require('./controllers/transactionController');

const PORT = process.env.PORT || 5001

connectToDatabase()

app.use(cors())
app.use(express.json())

app.get('/message', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

const userController = new UserController()

app.post('/v1/auth/firebase', phoneController.managePhoneNumber);
app.post('/signup', (req, res) => userController.signUp(req, res))
app.post('/login', LoginController.login)
app.get('/api/bankDetails/:ifscCode', bankDetails.getBankDetailsByIFSC)
app.post('/api/beneficiaries', BeneficiaryForm.benificiaryasync)
app.post('/sendData', sendDataController.sendData)
app.get('/getFormData', sendDataController.getFormData)
app.get('/api/transaction_history', transactionController.getTransactionHistory);

app.get('/api/displaybeneficiaries', Displaybeneficiary.beneficiary)
app.get('/api/barChartData', ChartControllerD.getBarChartData )
app.get('/api/getLineChartData', ChartControllerD.getLineChartData)
app.get('/api/getChartData', ChartControllerD.getChartData)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
