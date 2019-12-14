var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.render('summary/index',{title:"View",page:"dashboard"})
});


//===============DASHBOARD==========
router.get('/dashboard',userController.getDashboardPage)


router.get('/referral',userController.getReferralPage);

router.get('/invest',userController.getInvestPage);

router.get('/withdraw',userController.getWithdrawPage);


// router.get('/')

module.exports = router;
