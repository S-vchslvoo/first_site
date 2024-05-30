const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'qsccnfc123@gmail.com',
    password: 'Zprogrammist123_',
    database: 'sneakers',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = pool;
