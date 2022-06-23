const express = require('express');         // Import Express
const router = express.Router();            // Create new express router object to handle requests
const { v4: uuidv4 } = require('uuid');     // Import uuidv4 to create unique identifiers
const userController = require('../controllers/userController');
const pictureController = require('../controllers/pictureController');
const authenticationService = require('../services/authentication');


// Only let logged in users access user routes
router.use(authenticationService.authenticateJWT);


router.route('/:id')
    // Route to get to a user's page
    .get(userController.getUser)
    // Route to post the updated info back to the user's page
    .post(userController.updateUser);

// Route to get to a user's edit page
router.get('/:id/edit', userController.editUser);

// Route to post delete request
router.post('/:id/delete', userController.deleteUser);

// Route to get to the edit profilepic page and post the profile picture
router.route('/:id/profilepic')
    .get(userController.editProfilepic)
    .post(userController.updateProfilepic);

// Route to get to the change password page and post it to the database
router.route('/:id/password')
    .get(userController.editPassword)
    .post(userController.changePassword);

// Route to get to a user's gallery page
router.get('/:id/gallery', pictureController.getPicturesForUser);

// Route to get to a specific picture from a user's gallery
router.get('/:id/gallery/:pid', pictureController.getPicture);

// Get to the picture upload page and post it back to the server
router.route('/:id/upload')
    .get(pictureController.editPicture)
    .post(pictureController.uploadPicture);


module.exports = router;    // Export file as a router to be used in other files