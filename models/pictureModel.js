const db = require("../services/database").config; // Import database configuration

// Select all pictures
let getPictures = () =>
  new Promise((resolve, reject) => {
    db.query("SELECT * FROM pictures", function (err, pictures) {
      if (err) {
        reject(err);
      } else {
        // console.log(pictures);
        resolve(pictures);
      }
    });
  });

// Select a specific picture based on picture id
let getPicture = (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT pictures.*, users.username FROM pictures JOIN users ON pictures.u_id = users.id WHERE pictures.id = ${id}`,
      function (err, picture) {
        if (err) {
          reject(err);
        } else {
          // console.log(picture);
          resolve(picture[0]);
        }
      },
    );
  });

// Select all pictures from a specific user
let getPicturesForUser = (uid) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM pictures WHERE u_id = ${uid} ORDER by id DESC`,
      function (err, pictures) {
        if (err) {
          reject(err);
        } else {
          // console.log(pictures);
          resolve(pictures);
        }
      },
    );
  });

// Upload a new picture
let uploadPicture = (uid, fileName, pictureData) =>
  new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO pictures (u_id, filename, description) VALUES (" +
      db.escape(uid) +
      "," +
      // db.escape(pictureData.username) + "," +
      db.escape(fileName) +
      "," +
      db.escape(pictureData.description) +
      ")";

    console.log(sql);

    db.query(sql, function (err, picture) {
      if (err) reject(err);
      else resolve();
    });
  });

// Delete a picture based on the picture id
let deletePicture = (id) =>
  new Promise((resolve, reject) => {
    db.query(`DELETE FROM pictures WHERE id = ${id}`, function (err, user) {
      if (err) {
        reject(err);
      } else {
        console.log(`Picture is being deleted.`);
        resolve(id);
      }
    });
  });

module.exports = {
  getPictures,
  getPicture,
  getPicturesForUser,
  uploadPicture,
  deletePicture,
};
