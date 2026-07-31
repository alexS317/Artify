const fs = require("fs");
const mysql = require("mysql2");
const connectionConfig = require("./connection");

const config = mysql.createConnection({
  ...connectionConfig,
  multipleStatements: true,
});

const schema = fs.readFileSync("./db/schema.sql", "utf-8");

// Connect to database
config.connect((err) => {
  if (err) throw err; // Throw an error if connection fails
  console.log("Connected!");

  config.query(schema, (err) => {
    if (err) throw err;
    console.log("Database and tables set up successfully!");
    config.end();
  });
});
