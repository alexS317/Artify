const express = require('express');     // Import Express
const router = express.Router();
const userController = require('../controllers/userController');


// Route to get the index page from the server
router.get('/', (req, res) => {
    res.render('index');
});

// Routes to get login page and send login data to the server
router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {

    });

// Routes to get register page and send register data to the server (-> insert in database)
router.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post(userController.registerUser);


module.exports = router;