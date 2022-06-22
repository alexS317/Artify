const { v4: uuidv4 } = require('uuid');     // Import uuid module to create unique identifiers
const path = require('path');               // Import path module
const pictureModel = require('../models/pictureModel');
const userModel = require('../models/userModel');


// Display all pictures of one user in their gallery
function getPicturesForUser(req, res) {
    pictureModel.getPicturesForUser(req.params.id)
            .then(pictures => res.render('userGallery', {pictures}))
            .catch(error => res.sendStatus(500));
}

// Display one picture on the single picture page
function getPicture (req, res) {
    pictureModel.getPicture(req.params.pid)
        .then(picture => res.render('picture', {picture}))
        .catch(error => res.sendStatus(500));
}

// Go to the editPicture base to upload a new picture
function editPicture (req, res) {
    userModel.getUser(req.params.id)
        .then(user => res.render('uploadPicture', {user}))
        .catch(error => res.sendStatus(500));
}

// Upload a picture
function uploadPicture (req, res) {
    if (!req.files) {
        res.sendStatus(400);    // Send error if no file was uploaded
    } else {
        // Request 'picture' file from form
        const picture = req.files.picture;
        // Define a picture name that is made up of uuid and the file extension
        let pictureName = uuidv4() + path.extname(picture.name);
        // Save uploaded picture to the pictures folder and give it the previously defined name
        picture.mv(path.join(__dirname, '../public/uploads/pictures/') + pictureName);

        // Put the user id, the new picture name and the other data from the form as parameters in the uploadPicture function
        pictureModel.uploadPicture(req.params.id, pictureName, req.body)
            // Redirect to the user's gallery
            .then(() => res.redirect('/users/' + req.params.id + '/gallery'))
            .catch(error => res.sendStatus(500));
    }
}

module.exports = {
    getPicturesForUser,
    getPicture,
    editPicture,
    uploadPicture
}