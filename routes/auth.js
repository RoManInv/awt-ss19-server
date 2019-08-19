const router = require('express').Router();
const loginController = require('../controllers/authcontroller/login');
const regController = require('../controllers/authcontroller/register');

router.post('/login', loginController.login);
router.post('/logout', loginController.logout);
router.post('/register', regController.register);

module.exports = router;