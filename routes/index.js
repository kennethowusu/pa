var express = require('express');
var router = express.Router();
var indexController  = require('../controllers/indexController');
const user  = require('../functions/userFunctions');
const account = require("../functions/accountFunctions");

const mail = require('../mail/mail');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/login',user.loggedIn,function(req, res, next) {
  res.render('login', { title: 'Account Login|Prime ' });
});

router.post('/login',indexController.signin);
/* GET home page. */
router.get('/register',user.loggedIn,function(req, res, next) {
  res.render('register', { title: 'Create Account|Prime ' ,referee_id:req.query.ref});
});

router.get('/testview',function(req,res,next){


})

//================logout==================//
router.get('/account/logout',indexController.logout);
router.get('/test',function(req,res,next){

  //   var braintree = require("braintree");
  //
  //   var gateway = braintree.connect({
  //     environment: braintree.Environment.Sandbox,
  //     merchantId: "5fz7nmmw96d5xp5m",
  //     publicKey: "pr4b4pyxkgk8qz4d",
  //     privateKey: "122b3988a3e1d13910c07aff551aae3e"
  //   });
  //
  //
  // gateway.clientToken.generate({}, function (err, response) {
  //   res.render('test',{token:response.clientToken});

  var token = req.cookies.auth;
  //});
  // user.loggedIn(req,res,next);
  user.tokenIsValid(token).then(function(result){
    if(result){
      return res.render('account/dashboard')
    }
  })

})

router.post('/test',function(req,res,next){

  try{

    var braintree = require("braintree");

    var gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: "5fz7nmmw96d5xp5m",
      publicKey: "pr4b4pyxkgk8qz4d",
      privateKey: "122b3988a3e1d13910c07aff551aae3e"
    });


    gateway.transaction.sale({
      amount: "10.00",
      paymentMethodNonce: req.body.nonce,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
      console.log(result);
    });

  }catch(err){
    console.log(err.message)
  }




})

/* GET home page. */
router.get('/faqs', function(req, res, next) {
  res.render('faqs', { title: 'Frequently asked questions ' });
});


//============================POST ROUTES ================================//

//============sign up=========================//
router.post('/register',indexController.createUser);
module.exports = router;
