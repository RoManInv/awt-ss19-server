var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController/index');

/* GET home page. */
router.get('/', indexController.getData);

module.exports = router;
