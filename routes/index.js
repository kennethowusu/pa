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
router.get('/',indexController.getIndexPage);

/* GET home page. */
router.get('/login',user.loggedIn,function(req, res, next) {
  res.render('login', { title: 'Account Login|Prime ' });
});

router.post('/login',indexController.signin);
/* GET home page. */
router.get('/register',user.loggedIn,indexController.getSignupPage);

router.get('/faqs',user.loggedIn,indexController.getFaqsPage);

router.get('/terms',user.loggedIn,indexController.getTermsPage)

router.get('/about-us',user.loggedIn,indexController.getAboutUsPage)
//================logout==================//
router.get('/account/logout',indexController.logout);


router.get('/test',function(req,res,next){

  const user_id = user.getUserId(req,res,next);
  var braintree = require("braintree");

  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "5fz7nmmw96d5xp5m",
    publicKey: "pr4b4pyxkgk8qz4d",
    privateKey: "122b3988a3e1d13910c07aff551aae3e"
  });


})


/* GET home page. */
// router.get('/faqs', function(req, res, next) {
//   res.render('faqs', { title: 'Frequently asked questions ' });
// });
//
router.get('/account/content/loader',function(req,res,next){
  return res.render('content/loader')
})
//============================POST ROUTES ================================//

//============sign up=========================//
router.post('/register',indexController.createUser);
module.exports = router;
