const { Client } = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1',
  port: 5432, // Default PostgreSQL port
});

db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err);
  });
  module.exports = db;