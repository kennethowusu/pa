var accountController = require('../controllers/accountController');
var express = require('express');
var router = express.Router();
const user = require('../functions/userFunctions');

//=======================sign up ======================//

router.get('/summary',user.requireAuth,accountController.getSummaryPage);




//=========================get routes=============================//
router.get('/investment',user.requireAuth,function(req,res,next){
  res.render('account/investment',{title:"Dashboard"});
})

router.get('/deposit',user.requireAuth,function(req,res,next){
  res.render('account/deposit',{title:"Dashboard"});
})

router.get('/withdraw',user.requireAuth,function(req,res,next){
  res.render('account/withdraw',{title:"Dashboard"});
})

router.get('/activity',user.requireAuth,function(req,res,next){
  res.render('account/activity',{title:"Dashboard"});
})

//===================referral =======================//
router.get('/referral',user.requireAuth,accountController.getReferralPage);

















module.exports = router;
