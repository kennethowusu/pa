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

/* GET home page. */
router.get('/',user.loggedIn,indexController.getIndexPage);

/* GET home page. */
router.get('/login',user.loggedIn,function(req, res, next) {
  res.render('login', { title: 'Account Log In' });
});

router.post('/login',user.loggedIn,indexController.signin);
/* GET home page. */
router.get('/register',user.loggedIn,indexController.getSignupPage);

router.get('/faqs',user.loggedIn,indexController.getFaqsPage);



router.get('/about-us',user.loggedIn,indexController.getAboutUsPage)

router.get('/investment-plans',user.loggedIn,indexController.getInvestmentPage)

router.get('/contact',user.loggedIn,indexController.getContactPage)
//================logout==================//
router.get('/account/logout',indexController.logout);






router.get('/account/content/loader',function(req,res,next){
  return res.render('content/loader')
})
//============================POST ROUTES ================================//

//============sign up=========================//
router.post('/register',indexController.createUser);
module.exports = router;
