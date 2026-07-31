const mysql = require("mysql2"); // Import MySQL module
const connectionConfig = require("../db/connection");

const config = mysql.createConnection({...connectionConfig, database: process.env.DB_NAME});

// Connect to database
config.connect((err) => {
  if (err) throw err; // Throw an error if connection fails
  console.log("Connected!");
});

module.exports = { config };
