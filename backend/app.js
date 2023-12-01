// server.js

const express = require('express');
const admin = require('firebase-admin');
const AuthController = require('./firebase/phonecontroller');
const { connectToDatabase } = require('./database/db');
const phoneController = require('./firebase/phonecontroller');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
connectToDatabase();
app.post('/v1/auth/firebase',phoneController.managePhoneNumber);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});