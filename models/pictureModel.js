const db = require('../services/database').config;      // Import database configuration

// Select all pictures
let getPictures = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM ccl_pictures", function (err, pictures) {
        if (err) reject(err);
        // console.log(pictures);
        resolve(pictures);
    });
});

// Select a specific picture based on picture id (pid)
let getPicture = (pid) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ccl_pictures WHERE pid = ${pid}`, function (err, picture) {
        if (err) reject(err);
        // console.log(picture);
        resolve(picture[0]);
    });
});

// Select all pictures from a specific user
let getPicturesForUser = (id) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ccl_pictures WHERE id = ${id}`, function (err, pictures) {
        if (err) reject(err);
        // console.log(pictures);
        resolve(pictures);
    });
});

// Upload a new picture
let uploadPicture = (id, pictureName, pictureData) => new Promise((resolve, reject) => {
    let sql = "INSERT INTO ccl_pictures (id, username, picturename, description) VALUES (" +
        db.escape(id) + "," +
        db.escape(pictureData.username) + "," +
        db.escape(pictureName) + "," +
        db.escape(pictureData.description) + ")";

    console.log(sql);

    db.query(sql, function(err, picture) {
        if (err) reject(err);
        console.log(id, pictureName, pictureData);
        resolve();
    });
});

module.exports = {
    getPictures,
    getPicture,
    getPicturesForUser,
    uploadPicture
}