const express = require('express');
const router = express.Router();
// const path = require('path');
const userController = require('../controllers/userController');

// Route to get to the user page
router.get('/:id', userController.getUser)
router.get('/:id/edit', userController.editUser);
router.post('/:id', userController.updateUser);


module.exports = router;    // Export file as a router to be used in other files