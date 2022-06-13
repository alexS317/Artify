const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');

// router.get('/:id', userController.getUser);
router.get('/:id', userController.getUser)
router.get('/:id/edit', userController.editUser);
router.post('/:id', userController.updateUser);


// Route to get to the user page
module.exports = router;