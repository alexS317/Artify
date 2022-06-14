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
    console.log(req.body);
    userModel.updateUser(req.body)
        .then(user => res.render('user', {user}))
        .catch(error => res.sendStatus(500));
}

// Register a user and get redirected to their profile afterwards
function registerUser(req, res) {
    userModel.registerUser(req.body)
        .then(res.redirect('/login'))
        // .then(res.redirect('/user/:id'))
        // .then(user => res.render('user', {user}))
        .catch(error => res.sendStatus(500));
}

module.exports = {
    getUser,
    editUser,
    updateUser,
    registerUser
}