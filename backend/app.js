// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./database/db')
const UserController = require('./controllers/UserController');

const app = express();
const port = process.env.PORT || 5001;

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const userController = new UserController();

app.post('/signup', (req, res) => userController.signUp(req, res));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
