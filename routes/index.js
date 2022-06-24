const express = require('express');     // Import Express
const router = express.Router();        // Create new express router object to handle requests
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
const pictureModel = require('../models/pictureModel');
const authenticationService = require('../services/authentication');


// Route to get the index page from the server
router.get('/', (req, res) => {
    pictureModel.getPictures()
        .then(pictures => res.render('index', {pictures}))    // Render page
        .catch(error => res.redirect('/error'));
});

router.get('/error', (req, res) => {
    res.render('error');
});


// Routes to get login page and post login data to the server
router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        // Select all users to compare who is currently logging in
        userModel.getUsers()
            // Check if the correct login data is used (req.body is the data inserted in the login form, users comes from the userModel and res from the authenticationService)
            .then(users => authenticationService.authenticateUser(req.body, users, res))
            .catch(error => res.sendStatus(500));
    });


// Route to get back to homepage when logging out
router.get('/logout', (req, res) => {
    res.cookie('accessToken', {maxAge: 0});     // maxAge 0 deletes the cookie that authenticated the user
    res.redirect('/');                          // Automatically redirect to homepage when logging out
    console.log('User logged out.');
});


// Routes to get register page and send register data to the server (-> insert in database)
router.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post(userController.registerUser);


module.exports = router;    // Export files as a router to be used in other files