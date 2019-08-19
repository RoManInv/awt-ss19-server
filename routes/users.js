const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller/user');

router.get('/:id', userController.getUser);
//router.get('/token/:token', userController.getUserByToken);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);
router.post('/addrank', userController.addRank);
router.post('/attendCourse', userController.attendCourse);

module.exports = router;