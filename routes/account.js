var accountController = require('../controllers/accountController');
var express = require('express');
var router = express.Router();

//=======================sign up ======================//

router.get('/dashboard',function(req,res,next){
  res.render('account/dashboard',{title:"Dashboard"});
})


















module.exports = router;
