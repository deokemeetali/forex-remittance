const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5000,
    password: 'Meetali123',
    database: 'postgres'
});

async function connectToDatabase() {
  try {
      await client.connect();
      console.log('Connected to PostgreSQL database');
  } catch (error) {
      console.error('Error connecting to PostgreSQL database:', error.message);
  }
}

module.exports = {
    connectToDatabase
};