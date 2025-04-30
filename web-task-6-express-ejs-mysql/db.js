// db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

module.exports = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '1234',
    database: process.env.DB_NAME || 'products_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
