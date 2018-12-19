var accountController = require('../controllers/accountController');
var express = require('express');
var router = express.Router();
const user = require('../functions/userFunctions');
const account = require('../functions/accountFunctions')
//=======================sign up ======================//

router.get('/summary',user.requireAuth,
        account.verifyInvestmentPackage,
        accountController.getSummaryPage);




//=========================get routes=============================//
router.get('/investment',user.requireAuth,accountController.getInvestmentPage)

router.get('/plan/deposit',user.requireAuth,accountController.getDepositPage)

router.get('/withdraw',user.requireAuth,accountController.getWithdrawPage);

router.get('/activity',user.requireAuth,accountController.getActivityPage);

router.get('/confirmation',accountController.getConfirmationPage);
router.get('/includes/plan',accountController.getPlanModal);
//===================referral =======================//
router.get('/referral',user.requireAuth,accountController.getReferralPage);







//=================================POST ROUTES===========================//
router.post('/deposit',accountController.deposit);

//===================================PUT ROUTES=========================//
router.put('/user/notification',accountController.toggle_all_notifications);










module.exports = router;
