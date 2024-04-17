const config = require('./config.js');
const mysql = require('mysql2/promise');

try {
    const db = mysql.createPool({
        host: config.DB_HOST,
        port: config.DB_PORT,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME
    });
    module.exports = db;
    console.log("Conexión a la base de datos establecida correctamente.");
} catch (error) {
    console.error("Error al conectar a la base de datos:", error);
}


