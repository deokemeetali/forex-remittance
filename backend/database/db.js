const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'dimple@1234',
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