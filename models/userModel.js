const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const db = require('../services/database').config;

// Select all users
let getUsers = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM ccl_users", function (err, users) {
        if (err) reject(err);
        // console.log(users);
        resolve(users);
    });
});


// Select a specific user
let getUser = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ccl_users WHERE id = ${id}`, function (err, user) {
        if (err) reject(err);
        console.log(user);
        resolve(user[0]);
    });
});


// Update a user's data and insert it into database
let updateUser = (userData) => new Promise(async function (resolve, reject) {
    let pw = await bcrypt.hash(userData.password, 10);
    function pfpUpload(req, res) {
        let profilepic = userData.files.profilepic;
        console.log(profilepic);
        let filename = '../uploads/' + uuidv4() + '.png';
        console.log(filename);
        profilepic.mv(filename);
        console.log('saved pfp to: ' + filename);
    }
    let sql = "UPDATE ccl_users SET " +
    "username = " + db.escape(userData.username) +
    ", email = " + db.escape(userData.email) +
    ", password = " + db.escape(pw) +
    ", pronouns = " + db.escape(userData.pronouns) +
    ", location = " + db.escape(userData.location) +
    ", bio = " + db.escape(userData.bio) +
    // ", profilepic = " + db.escape(pfpUpload()) +
    " WHERE id = " + parseInt(userData.id);

    console.log(sql);

    db.query(sql, function(err, user) {
        if (err) reject(err);
        // console.log(userData);
        resolve(userData);
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
        console.log(user);
        resolve(userData);
    });
});


module.exports = {
    getUsers,
    getUser,
    updateUser,
    registerUser
}