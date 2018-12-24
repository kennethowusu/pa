var accountController = require('../controllers/accountController');
var express = require('express');
var router = express.Router();
const user = require('../functions/userFunctions');
const account = require('../functions/accountFunctions');
const adminController = require('../controllers/adminController');





router.get('/',adminController.getSummaryPage);














module.exports = router;
