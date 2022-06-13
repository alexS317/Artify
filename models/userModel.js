const db = require('../services/database').config;


// Select a specific user
let getUser = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ccl_users WHERE id = ${id}`, function (err, user) {
        if (err) reject(err);
        console.log(user);
        resolve(user[0]);
    });
});


// Register a new user and insert them into database
let registerUser = (userData) => new Promise((resolve, reject) => {
    let sql = "INSERT INTO ccl_users (username, email, password) VALUES (" +
        db.escape(userData.username) + "," +
        db.escape(userData.email) + "," +
        db.escape(userData.password) + ")";

    console.log(sql);

    db.query(sql, function (err, user) {
        if (err) reject(err);
        console.log(user[0]);
        resolve(userData);
    });
});

let updateUser = (userData) => new Promise((resolve, reject) => {
    let sql = "UPDATE ccl_users SET " +
    "username = " + db.escape(userData.username) +
    ", email = " + db.escape(userData.email) +
    ", password = " + db.escape(userData.password) +
    ", pronouns = " + db.escape(userData.pronouns) +
    ", location = " + db.escape(userData.location) +
    ", bio = " + db.escape(userData.bio) +
    " WHERE id = " + parseInt(userData.id);

    console.log(sql);

    db.query(sql, function(err, user) {
        if (err) reject(err);
        // console.log(userData);
        resolve(userData);
    });
});


module.exports = {
    getUser,
    registerUser,
    updateUser
}