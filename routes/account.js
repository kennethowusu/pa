var accountController = require('../controllers/accountController');
var express = require('express');
var router = express.Router();
const user = require('../functions/userFunctions');
const account = require('../functions/accountFunctions')
//=======================sign up ======================//

router.get('/summary',user.requireAuth,
        user.isVerified,
        account.verifyInvestmentPackage,
        accountController.getSummaryPage);




//=========================get routes=============================//
router.get('/investment',
  user.requireAuth,
  user.isVerified,
  account.verifyInvestmentPackage,
  accountController.getInvestmentPage)

router.get('/plan/deposit',
    user.requireAuth,
    user.isVerified,
    account.verifyInvestmentPackage,
    accountController.getDepositPage)

router.get('/withdraw',
    user.requireAuth,
    user.isVerified,
    account.verifyInvestmentPackage,
    accountController.getWithdrawPage);

router.get('/activity',
    user.requireAuth,
    user.isVerified,
    account.verifyInvestmentPackage,
    accountController.getActivityPage);


router.get('/top-up',
        user.requireAuth,
        user.isVerified,
        account.verifyInvestmentPackage,
        accountController.getTopupPage);

router.get('/confirmation',  user.requireAuth,accountController.getConfirmationPage);
router.get('/includes/plan',accountController.getPlanModal);
//===================referral =======================//
router.get('/referral',
    user.requireAuth,
    user.isVerified,
    account.verifyInvestmentPackage,
    accountController.getReferralPage);


    router.get('/notifications',
        user.requireAuth,
        user.isVerified,
        account.verifyInvestmentPackage,
        accountController.getNotificationsPage);


            router.get('/notifications/:id',
                user.requireAuth,
                user.isVerified,
                account.verifyInvestmentPackage,
                accountController.getNotificationPage);



router.get('/confirmation/send',  user.requireAuth,accountController.sendResetLink);

router.get('/confirmation/verification/:token',accountController.verifyEmail)
//=================================POST ROUTES===========================//
router.post('/deposit',accountController.deposit);

router.post('/password/reset',accountController.resetPassword);

router.post('/password/reset/send',accountController.sendPasswordResetLink)

router.post('/plan/deposit/crypto',user.requireAuth,accountController.sendCryptoPayment);

router.post('/plan/deposit/crypto/top-up',user.requireAuth,accountController.topupCryptoPayment);
//===================================PUT ROUTES=========================//
router.put('/user/notification',accountController.toggle_all_notifications);



///===========
router.get('/password/reset/:token',accountController.confirmResetPasswordToken)






module.exports = router;
