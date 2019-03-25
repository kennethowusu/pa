var express = require('express');
var router = express.Router();
var summaryController  = require('../controllers/summaryController');
const user  = require('../functions/userFunctions');
const account = require("../functions/accountFunctions");
const util = require('util');


const investmentController = require('../controllers/investmentController')





router.get('/',
      user.requireAuth,
      user.isVerified,
      investmentController.getInvestmentIndexPage)


router.get('/top-up',
          user.requireAuth,
          user.isVerified,
          investmentController.getTopupPage)

router.get('/deposit',
            user.requireAuth,
            user.isVerified,
            investmentController.getDepositPage)

router.post('/deposit/confirm-deposit',
            user.requireAuth,
            user.isVerified,
            investmentController.confirmPayment)
module.exports = router;
