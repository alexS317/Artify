const db = require('../services/database').config;

let uploadPicture = (id, pictureData) => new Promise((resolve, reject) => {
    let sql = "INSERT INTO ccl_pictures (filename, id, description) VALUES (" +
        db.escape(pictureData.filename) + "," +
        `(SELECT id FROM ccl_users WHERE id = ${id}),`
        db.escape(pictureData.description) + ")";

    console.log(sql);

    db.query(sql, function(err, picture) {
        if (err) reject(err);
        console.log(picture);
        resolve(pictureData);
    });
});

module.exports = {
    uploadPicture
}