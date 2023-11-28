const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./database/db')

const app = express();
const port = process.env.PORT || 5001;

connectToDatabase();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
