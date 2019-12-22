var express = require('express');
var router = express.Router();
const user = require('../functions/userFunctions')
const userController = require('../controllers/userController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.render('summary/index',{title:"View",page:"dashboard"})
});


//===============DASHBOARD==========
router.get('/dashboard',
user.requireAuth,
userController.getDashboardPage)


router.get('/referral',
user.requireAuth,
userController.getReferralPage);

router.get('/invest',
user.requireAuth,
userController.getInvestPage);

router.get('/withdraw',
user.requireAuth,
userController.getWithdrawPage);


router.get('/history',
user.requireAuth,
userController.getHistoryPage);


// router.get('/')

module.exports = router;
