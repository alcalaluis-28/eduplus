require('dotenv').config();

//Administrar la BD(promesesas=proceso en curso..)
const mysql = require('mysql2/promise');

//Pool de conexiones  = acceso
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'eduplus',
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_POOL_SIZE || 10),
  queueLimit: 0,
  multipleStatements: false,  // evita SQL injection por lotes
  dateStrings: true           // fechas como string (sin líos de TZ)
});

//Aprovechar el recurso en otra parte de la App
module.exports = pool;
