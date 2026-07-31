require("dotenv").config();
const mysql = require("mysql2");

// Configure database properties to be able to connect
const connectionConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

module.exports = connectionConfig;
