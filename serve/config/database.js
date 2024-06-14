const mysql = require('mysql2');
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname, '../.env')})
console.log('>>> process.env.DB_HOST',process.env.DB_HOST);
// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:process.env.DB_PORT
});


connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database successfully');
  });

module.exports = connection;
