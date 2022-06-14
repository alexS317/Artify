const express = require('express');     // Import Express
const router = express.Router();        // Create router object to handle requests
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
const authenticationService = require('../services/authentication');


// Route to get the index page from the server
router.get('/', (req, res) => {
    res.render('index');    // Render page
});

// Routes to get login page and post login data to the server
router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        userModel.getUsers()
            .then(users => authenticationService.authenticateUser(req.body, users, res))
            .catch(error => res.sendStatus(500));
    });

// Route to get back to homepage when logging out
router.get('/logout', (req, res) => {
    res.cookie('accessToken', {maxAge: 0});     // maxAge 0 deletes cookie
    res.redirect('/');
    console.log('User logged out.');
});

// Routes to get register page and send register data to the server (-> insert in database)
router.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post(userController.registerUser);
    // .post((req, res) => {
    //     userController.registerUser;
    //     userModel.getUsers()
    //         .then(users => authenticationService.authenticateUser(req.body, users, res))
    //         .catch(error => res.sendStatus(500));
    // });


module.exports = router;    // Export files as a router to be used in other files