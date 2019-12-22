var express = require('express');
var router = express.Router();
var indexController  = require('../controllers/indexController');
const user  = require('../functions/userFunctions');
const account = require("../functions/accountFunctions");
const util = require('util');

const FINANCE = require('../models/financeModel');
const User = require('../models/userModel');
const Investment = require('../models/investmentModel')
const money = require('money-math');
const Deposit = require('../models/depositModel')

const depsosit = require('../models/depositModel')
const mail = require('../mail/mail');



module.exports.checkReferral = (req,res,next)=>{
  if(req.query.i){
    req.session.i = req.query.i;
  }
  next();
}
/* GET home page. */
router.get('/',module.exports.checkReferral,indexController.getIndexPage);

/* GET home page. */
router.get('/login',user.loggedIn,module.exports.checkReferral,function(req, res, next) {
  res.render('login', { title: 'Account Log In' });
});

router.post('/login',user.loggedIn,indexController.signin);
/* GET home page. */
router.get('/register',user.loggedIn,module.exports.checkReferral,indexController.getSignupPage);

router.get('/faqs',module.exports.checkReferral,indexController.getFaqsPage);

router.get('/support',module.exports.checkReferral,indexController.getSupportPage);


//================logout==================//
router.get('/user/logout',indexController.logout);







//============================POST ROUTES ================================//

//============sign up=========================//
router.post('/register',indexController.createUser);
module.exports = router;
