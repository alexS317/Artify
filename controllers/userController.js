const { v4: uuidv4 } = require('uuid');
const path = require('path');
const userModel = require('../models/userModel');

// Display the page for one user
function getUser(req, res) {
    userModel.getUser(req.params.id)
        .then(user => res.render('user', {user}))
        .catch(error => res.sendStatus(500));
}

// Display the user edit page
function editUser(req, res) {
    userModel.getUser(req.params.id)
        .then(user => res.render('editUser', {user}))
        .catch(error => res.sendStatus(500));
}

// Update the user's info
function updateUser(req, res) {
    userModel.updateUser(req.body)
        .then(user => res.render('user', {user}))
        .catch(error => res.sendStatus(500));
}

function updateProfilepic(req, res) {
    if (!req.files) {
        res.sendStatus(400);
    } else {
        const profilepic = req.files.profilepic;
        let filename = uuidv4() + path.extname(profilepic.name);
        console.log(filename);
        profilepic.mv(path.join(__dirname, '../public/uploads/profilepics/') + filename);

        userModel.updateProfilepic(req.params.id, filename)
            .then(() => res.redirect(`/users/${req.params.id}`))
            .catch(error => res.sendStatus(500));
    }
}

// Register a user and get redirected to their profile afterwards
function registerUser(req, res) {
    userModel.registerUser(req.body)
        .then(() => res.redirect('/login'))
        .catch(error => res.sendStatus(500));
}

function deleteUser(req, res) {
    userModel.deleteUser(req.params.id)
        .then(() => res.redirect('/logout'))
        .catch(error => res.sendStatus(500));
}

module.exports = {
    getUser,
    editUser,
    updateUser,
    registerUser,
    deleteUser,
    updateProfilepic
}