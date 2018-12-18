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
  Investment.find({where:{user_id:user_id}})
  .then(function(investment){
    //check if investment status is active
    const transaction_id = investment.principal_transaction_id;
    if(investment.status=='inactive' || investment.investment_type==null){
      console.log("he's not on any investment package")
    }
    else if(investment.investment_status == 'active' && investment.principal_credited_status=='yes'){
      console.log('he has settled us let him go')
      return;
    }
    else if(investment.investment_status == 'active' && investment.principal_credited_status == 'no'){
        gateway.transaction.find(transaction_id,function(err,transaction){
          if(transaction.status=="settled"){
            Investment.update({principal_credited_status:'yes'},{where:{user_id:user_id}});
            Deposit.update({transaction_status:transaction.status},{where:{transaction_id:transaction_id}})
          }
          //cancel investment packages when it settlement fails
          else if(transaction.status=="failed"
                || transaction.status=="processor_declined"
                || transaction.status=="gateway_rejected"
                || transaction.status=="settlement_declined"
                || transaction.status == "authorization_expired" ){
                  Investment.update({
                    investment_type:null,
                    investment_amount:null,
                    investment_date:null,
                    investment_status:'inactive',
                    principal_transaction_id:null,
                    principal_credited_status:'no',
                  },{where:{user_id:user_id,principal_transaction_id:transaction_id}})
                  .then(function(){
                    //send user notification
                    //send user email Notification
                    console.log('investment package destroyed');
                  })
                }

        })//gateway.transaction.find
    }//if investment.status=='active'
  })//investment.find

})


/* GET home page. */
// router.get('/faqs', function(req, res, next) {
//   res.render('faqs', { title: 'Frequently asked questions ' });
// });
//

//============================POST ROUTES ================================//

//============sign up=========================//
router.post('/register',indexController.createUser);
module.exports = router;
