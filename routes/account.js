var accountController = require('../controllers/accountController');
var express = require('express');
var router = express.Router();

//=======================sign up ======================//

router.get('/summary',function(req,res,next){
  res.render('account/summary',{title:"Dashboard"});
})



//===================referral =======================//
router.get('/referral',accountController.getReferralPage);

















module.exports = router;
