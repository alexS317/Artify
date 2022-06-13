const mysql = require('mysql');             // Import MySQL module
const secrets = require('../secrets');      // Require secrets file to use the password

// Configure database properties to be able to connect
const config = mysql.createConnection({
    host: "atp.fhstp.ac.at",
    port: 8007,
    user: "cc211020",
    password: secrets.dbPassword,
    database: "cc211020"
});

// Connect to database
config.connect(function (err) {
    if (err) throw err;                     // Throw an error if connection fails
    console.log('Connected!');
});

module.exports = {config};