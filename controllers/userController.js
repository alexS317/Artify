const { v4: uuidv4 } = require('uuid');         // Import uuid module to create unique identifiers
const path = require('path');                   // Import path module
const userModel = require('../models/userModel');

// Display the page for one user
function getUser(req, res, next) {
    userModel.getUser(req.params.id)
        // Render the user page of and get user data as object to insert in page
        .then((user) => {
            let currentUserID = parseInt(req.cookies.ID);
            if(user.id === currentUserID) res.render('user', {user, ID: req.cookies.ID})
            else res.render('otherUser', {user, ID: req.cookies.ID})
            }
        )
        .catch(error => res.redirect('/error'));
}

// Display the user edit page
function editUser(req, res) {
    userModel.getUser(req.params.id)
        // Render the user edit page and get user data as object to insert in page
        .then(user => res.render('editUser', {user}))
        .catch(error => res.redirect('/error'));
}

// Update the user's info and display their page with the new info
function updateUser(req, res) {
    // Send data that was put in form (body) to updateUser function
    userModel.updateUser(req.body)
        // Redirect to the user page
        .then(() => res.redirect(`/users/${req.params.id}`))
        .catch(error => res.redirect('/error'));
}


// Display the edit profilepic page
function editProfilepic(req, res) {
    userModel.getUser(req.params.id)
        .then(user => res.render('editProfilepic', {user}))
        .catch(error => res.redirect('/error'));
}

// Update the profilepic and get back to the user page
function updateProfilepic(req, res) {
    if (!req.files) {
        res.redirect('/error');
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
            .catch(error => res.redirect('/error'));
    }
}


// Display the edit password page
function editPassword(req, res) {
    userModel.getUser(req.params.id)
        .then(user => res.render('changePassword', {user}))
        .catch(error => res.redirect('/error'));
}

// Update the password and get back to the user page
function changePassword(req, res) {
    userModel.changePassword(req.body)
        .then(() => res.redirect(`/users/${req.params.id}`))
        .catch(error => res.redirect('/error'));
}

// Register a user
function registerUser(req, res) {
    // Send data that was put in form (body) to registerUser function
    userModel.registerUser(req.body)
        // Get redirected to the login page
        .then(() => res.redirect('/login'))
        .catch(error => res.redirect('/error'));
}

// Delete a user
function deleteUser(req, res) {
    userModel.deleteUser(req.params.id)
        // Automatically log out when deleted
        .then(() => res.redirect('/logout'))
        .catch(error => res.redirect('/error'));
}

module.exports = {
    getUser,
    editUser,
    updateUser,
    editProfilepic,
    updateProfilepic,
    editPassword,
    changePassword,
    registerUser,
    deleteUser
}