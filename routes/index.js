var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');

// INDEX PAGE ROUTES
router.get('/', indexController.index);
router.post('/new', indexController.new);


module.exports = router;