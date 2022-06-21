const { v4: uuidv4 } = require('uuid');
const path = require('path');
const pictureModel = require('../models/pictureModel');
const userModel = require('../models/userModel');

function getPictures(req, res) {
    pictureModel.getPictures()
        .then(pictures => res.render('userGallery', {pictures}))
        .catch(error => res.sendStatus(500));
}

function getPicture (req, res) {
    pictureModel.getPicture(req.params.pid)
        .then(picture => res.render('picture', {picture}))
        .catch(error => res.sendStatus(500));
}

function editPicture (req, res) {
    userModel.getUser(req.params.id)
        .then(user => res.render('uploadPicture', {user}))
        .catch(error => res.sendStatus(500));
}

function uploadPicture (req, res) {
    if (!req.files) {
        res.sendStatus(400);
    } else {
        const picture = req.files.picture;
        let pictureName = uuidv4() + path.extname(picture.name);
        console.log(pictureName);
        picture.mv(path.join(__dirname, '../public/uploads/pictures/') + pictureName);

        pictureModel.uploadPicture(req.params.id, pictureName, req.body)
            .then(picture => {
                // userModel.getUser(req.params.id);
                res.render('picture', {picture})
            })
            .catch(error => {
                console.error(error);
                res.sendStatus(500)
            });
    }
}

module.exports = {
    getPictures,
    getPicture,
    editPicture,
    uploadPicture
}