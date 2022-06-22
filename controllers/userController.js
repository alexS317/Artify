const { v4: uuidv4 } = require('uuid');         // Import uuid module to create unique identifiers
const path = require('path');                   // Import path module
const userModel = require('../models/userModel');

// Display the page for one user
function getUser(req, res) {
    userModel.getUser(req.params.id)
        // Render the user page and get user data as object to insert in page
        .then(user => res.render('user', {user}))
        .catch(error => res.sendStatus(500));
}

// Display the user edit page
function editUser(req, res) {
    userModel.getUser(req.params.id)
        // Render the user edit page and get user data as object to insert in page
        .then(user => res.render('editUser', {user}))
        .catch(error => res.sendStatus(500));
}

// Update the user's info and display their page with the new info
function updateUser(req, res) {
    // Send data that was put in form (body) to updateUser function
    userModel.updateUser(req.body)
        // Render the user page and get user data as object to insert in page
        .then(user => res.render('user', {user}))
        .catch(error => res.sendStatus(500));
}

function updateProfilepic(req, res) {
    if (!req.files) {
        res.sendStatus(400);    // Send error if no file was uploaded
    } else {
        // Request 'profilepic' file from form
        const profilepic = req.files.profilepic;
        // Define a picture name that is made up of uuid and the file extension
        let filename = uuidv4() + path.extname(profilepic.name);
        // Save uploaded picture to the profilepics folder and give it the previously defined name
        profilepic.mv(path.join(__dirname, '../public/uploads/profilepics/') + filename);

        // Put the user id and the filename as parameters in the uploadProfilePic function
        userModel.updateProfilepic(req.params.id, filename)
            // Redirect to the user's page
            .then(() => res.redirect(`/users/${req.params.id}`))
            .catch(error => res.sendStatus(500));
    }
}

// Register a user
function registerUser(req, res) {
    // Send data that was put in form (body) to registerUser function
    userModel.registerUser(req.body)
        // Get redirected to the login page
        .then(() => res.redirect('/login'))
        .catch(error => res.sendStatus(500));
}

// Delete a user
function deleteUser(req, res) {
    userModel.deleteUser(req.params.id)
        // Automatically log out when deleted
        .then(() => res.redirect('/logout'))
        .catch(error => res.sendStatus(500));
}

module.exports = {
    getUser,
    editUser,
    updateUser,
    updateProfilepic,
    registerUser,
    deleteUser
}