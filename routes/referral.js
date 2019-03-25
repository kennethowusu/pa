var express = require('express');
var router = express.Router();
var summaryController  = require('../controllers/summaryController');
const user  = require('../functions/userFunctions');
const account = require("../functions/accountFunctions");
const util = require('util');


const referralController = require('../controllers/referralController')





router.get('/',
     user.requireAuth,
     user.isVerified,
     referralController.getReferralIndexPage)


// router.post('/change-password',user.requireAuth,settingsController.changePassword)

module.exports = router;
