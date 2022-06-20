const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
const authenticationService = require('../services/authentication');
const { v4: uuidv4 } = require('uuid');
const { render } = require('ejs');

// router.use(authenticationService.authenticateJWT);

// Route to get to the user page
router.get('/:id', userController.getUser)
router.get('/:id/edit', userController.editUser);
router.post('/:id', userController.updateUser);
router.post('/:id/delete', userController.deleteUser);

router.get('/:id/gallery', (req, res) => res.render('userGallery'));
router.get('/:id/artwork', (req, res) => res.render('artwork'));
router.get('/:id/upload', (req, res) => res.render('uploadArtwork'));


// router.route('/:id/artwork')
//     .get((req, res) => {
//         const filename = req.params.profilepic + '.png';
//         const options = {
//             root: path.join(__dirname, '../uploads')
//         }
//         res.sendFile(filename, options);
//     })
//     .post((req, res) => {
//         try {
//             if(!req.files) {
//                 res.send({
//                     status: false,
//                     message: 'No file has been uploaded.'
//                 });
//             } else {
//                 let profilepic = req.files.profilepic;
//                 let filename = './uploads/' + uuid() + 'png';
//                 profilepic.mv(filename);
//                 console.log('Saved picture to: ' + filename);
//                 res.send({
//                     status: true,
//                     message: 'File is uploaded.',
//                     data: {
//                         name: profilepic.name
//                     }
//                 });
//             }
//         } catch(err) {
//             res.sendStatus(500).send(err);
//         }
//     })


module.exports = router;    // Export file as a router to be used in other files