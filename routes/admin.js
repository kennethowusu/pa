var accountController = require('../controllers/accountController');
var express = require('express');
var router = express.Router();
const user = require('../functions/userFunctions');
const account = require('../functions/accountFunctions');
const adminController = require('../controllers/adminController');





router.get('/summary',adminController.getSummaryPage);
router.get('/daily-interest',adminController.getDailyInterest);
router.get('/payment-requests',adminController.getPaymentRequest);
router.get('/payment-confirmation',adminController.getPaymentConfirmation);












module.exports = router;
