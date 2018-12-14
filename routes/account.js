var accountController = require('../controllers/accountController');
var express = require('express');
var router = express.Router();
const user = require('../functions/userFunctions');

//=======================sign up ======================//

router.get('/summary',user.requireAuth,accountController.getSummaryPage);




//=========================get routes=============================//
router.get('/investment',user.requireAuth,accountController.getInvestmentPage)

router.get('/deposit',user.requireAuth,accountController.getDepositPage)

router.get('/withdraw',user.requireAuth,accountController.getWithdrawPage);

router.get('/activity',user.requireAuth,accountController.getActivityPage);


//===================referral =======================//
router.get('/referral',user.requireAuth,accountController.getReferralPage);









//===================================PUT ROUTES=========================//
router.put('/user/notification',accountController.toggle_all_notifications);










module.exports = router;
