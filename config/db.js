// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

// Pool de conexiones
const pool = mysql.createPool({
  host:     process.env.DB_HOST 
  user:     process.env.DB_USER 
  password: process.env.DB_PASSWORD 
  database: process.env.DB_DATABASE 
  port:     Number(process.env.DB_PORT)
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_POOL_SIZE || 10),
  queueLimit: 0,
});

// Helper simple para consultas
async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// Cierre ordenado 
process.on('SIGINT', async () => {
  try { await pool.end(); } catch {}
  process.exit(0);
});

module.exports = { pool, query };
