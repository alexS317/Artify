const express = require('express');
const router = express.Router();
// const path = require('path');
const userController = require('../controllers/userController');
const pictureController = require('../controllers/pictureController');
const authenticationService = require('../services/authentication');
const { v4: uuidv4 } = require('uuid');
// const { render } = require('ejs');

router.use(authenticationService.authenticateJWT);

// Route to get to the user page
router.get('/:id', userController.getUser);
// Route to get to the edit page
router.get('/:id/edit', userController.editUser);
// Route to post the updated info
router.post('/:id', userController.updateUser);
// Route to post delete request
router.post('/:id/delete', userController.deleteUser);
// Route to post the profile picture
router.post('/:id/profilepic', userController.updateProfilepic);

router.get('/:id/gallery', pictureController.getPicturesForUser);
router.get('/:id/addpicture', pictureController.editPicture);
router.post('/:id/upload', pictureController.uploadPicture);
router.get('/:id/gallery/:pid', pictureController.getPicture);


module.exports = router;    // Export file as a router to be used in other files