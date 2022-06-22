const bcrypt = require('bcrypt');                       // Import bcrypt module to encrypt passwords
const db = require('../services/database').config;      // Import database configuration

// Select all users from the database
let getUsers = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM ccl_users", function (err, users) {
        if (err) reject(err);
        // console.log(users);
        resolve(users);
    });
});


// Select a specific user based on their id
let getUser = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ccl_users WHERE id = ${id}`, function (err, user) {
        if (err) reject(err);
        // console.log(user);
        resolve(user[0]);
    });
});


// Update a user's data and insert it into database
let updateUser = (userData) => new Promise(async function (resolve, reject) {
    let pw = await bcrypt.hash(userData.password, 10);  // Encrypt password
    let sql = "UPDATE ccl_users SET " +
    "username = " + db.escape(userData.username) +
    ", email = " + db.escape(userData.email) +
    ", password = " + db.escape(pw) +
    ", pronouns = " + db.escape(userData.pronouns) +
    ", location = " + db.escape(userData.location) +
    ", bio = " + db.escape(userData.bio) +
    // ", profilepic = " + db.escape(filename) +
    " WHERE id = " + parseInt(userData.id);

    console.log(sql);

    db.query(sql, function(err, user) {
        if (err) reject(err);
        // console.log(userData);
        resolve(userData);
    });
});

// Update a user's profile picture and insert the picture name into the database
let updateProfilepic = (id, filename) => new Promise((resolve, reject) => {
    let sql = `UPDATE ccl_users SET profilepic = ${db.escape(filename)} WHERE id = ${id}`;
    console.log(sql);
    db.query(sql, function (err) {
        if (err) reject(err);
        resolve();
    });
});


// Register a new user and insert them into database
let registerUser = (userData) => new Promise(async function (resolve, reject) {
    let pw = await bcrypt.hash(userData.password, 10);
    let sql = "INSERT INTO ccl_users (username, email, password) VALUES (" +
        db.escape(userData.username) + "," +
        db.escape(userData.email) + "," +
        db.escape(pw) + ")";

    console.log(sql);

    db.query(sql, function (err, user) {
        if (err) reject(err);
        // console.log(userData);
        resolve(userData);
    });
});

// Delete a user based on their id
let deleteUser = (id) => new Promise((resolve, reject) => {
    db.query(`DELETE FROM ccl_users WHERE id = ${id}`, function(err, user) {
        if (err) reject(err);
        console.log(`User is being deleted.`);
        resolve(id);
    });
});


module.exports = {
    getUsers,
    getUser,
    updateUser,
    updateProfilepic,
    registerUser,
    deleteUser
}