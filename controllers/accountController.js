const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const user  = require('../functions/userFunctions');
const async = require('async');
const truncate = require('truncate');
const money    = require('money-math');
const util   = require('util');
const mail    =  require('../mail/mail');
// const mail = require('../mail/mail');
require('dotenv').config();


//===========models================//
var User = require('../models/userModel');
const Notification = require('../models/notificationModel.js');
const Finance       = require('../models/financeModel.js');
const Investment    = require('../models/investmentModel.js');
const Deposit       = require('../models/depositModel');
const moment        = require('moment');
//==============variables=============/




const braintree = require("braintree");

const  gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "5fz7nmmw96d5xp5m",
  publicKey: "pr4b4pyxkgk8qz4d",
  privateKey: "122b3988a3e1d13910c07aff551aae3e"
});




//=======================GET CONROLLERS=============//

module.exports.getConfirmationPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);
  User.find({where:{user_id:user_id}})
  .then(function(person){
    if(!person.is_verified){
      return res.render('account/confirmation',{title:'Account Confirmation',person:person});
    }else{
      return res.redirect('/account/summary');
    }
  })
}

module.exports.verifyEmail  = (req,res,next)=>{
  const token = req.params.token;

  var decoded = jwt.decode(token);
  const user_id = decoded.id;
  User.update({is_verified:1},{where:{user_id:user_id}})
    .then(function(){
      return res.render('account/email-verified',{title:"Account Verified"});
    })
}

module.exports.getPlanModal = (req,res,next)=>{
  return res.render('account/plan-modal');
}
module.exports.getSummaryPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3},
      {model:Finance,where:{user_id:user_id},required:true}]
  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      return res.render('account/summary',{title:'Account Summary',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count,
      finance:person.finance})
    })//Notificatin.findAndCountAll
  })//then(person)
}
module.exports.getReferralPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3},
      {model:Finance,where:{user_id:user_id},required:true}
    ]
  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      const ref_url = req.protocol + '://' + req.get('host') + '?i=' + person.referal_id;
      return res.render('account/referral',{title:'Account Referral',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count,ref_url:ref_url,
      finance:person.finance})
    })//Notificatin.findAndCountAll
  })//then(person)
}


module.exports.sendResetLink = function(req,res,next){
  const  user_id = user.getUserId(req,res,next);
  const  url = req.protocol + '://' + req.get('host') + '/account/confirmation/verification/';
  User.find({where:{user_id:user_id}})
      .then(function(person){
        const verificationLink = user.generateVerificationToken(req,res,next,person);
        mail.sendEmailVerificationLink(person.email,url+verificationLink);
      }).then(function(){
        return res.send('sent');
      })
}

module.exports.confirmResetPasswordToken = (req,res,next)=>{
  const token = req.params.token;

  var decoded = jwt.decode(token);
  const user_id = decoded.id;
  User.find({where:{user_id:user_id}})
    .then(function(user){
      return res.render('password-reset',{title:"Password Reset",email:user.email});
    })
}
module.exports.getActivityPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3}]
  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      return res.render('account/activity',{title:'Activity',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count})
    })//Notificatin.findAndCountAll
  })//then(person)
}



module.exports.getWithdrawPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3},
      {model:Investment,where:{user_id:user_id},required:true}]

  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      console.log(count)
      return res.render('account/withdraw',{title:'Withdraw',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count,
      investment:person.investment})
    })//Notificatin.findAndCountAll
  })//then(person);
}


module.exports.getDepositPage  = (req,res,next)=>{
  const type = req.query.type;
  const amount = req.query.amount;
  const title  = req.query.title;
  const user_id = user.getUserId(req,res,next);

  if(type==null || amount==null){
    return res.redirect('/account/summary');
  }
  if(type=='gold-plan' || type=='diamond-plan' || type=='platinum-plan'){
  }else{
    return res.redirect('/account/summary');
  }
  if(type=='gold-plan'){
    if(amount > 999 && amount<=10000){

    }else{
      return res.redirect('/account/summary');
    }
  }else if(type=='diamond-plan'){
    if(amount >=10000){

    }else{
      return res.redirect('/account/summary');
    }
  }else if(type=='platinum-plan'){
    if(amount >=1000){

  }else{
    return res.redirect('/account/summary');
  }
}



  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3}]
  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){

      gateway.clientToken.generate({}, function (err, response) {
        return res.render('account/deposit',{title:'Deposit',
        user:person,notifications:person.notifications,
        moment:moment,truncate:truncate,notification_count:count,
        token:response.clientToken,type:type,amount:amount,package_title:title})
    })

    })//Notificatin.findAndCountAll
  })//then(person)
}

module.exports.getInvestmentPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3},
    {model:Investment,where:{user_id:user_id},required:true}]
  })
  .then((person)=>{
    console.log(person)
    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      console.log(count)
      return res.render('account/investment',{title:'Investment',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count,
      investment:person.investment})
    })//Notificatin.findAndCountAll
  })//then(person)
}




//=================POST CONTROLLERS=====================//
module.exports.sendPasswordResetLink = (req,res,next)=>{
  const email  = req.body.email;

 const  url = req.protocol + '://' + req.get('host') + '/account/password/reset/';
  User.find({where:{email:email}})
      .then(function(person){
        if(person == null){
          return res.send('Email does not exist');
        }else{
          const passwordResetLink = user.generateVerificationToken(req,res,next,person);
          mail.sendPasswordResetLink(person.email,url+passwordResetLink);
          return res.send('Your password reset link has been set,please check your mail box');
        }
      })
}
module.exports.deposit = (req,res,next)=>{

  const user_id = user.getUserId(req,res,next);
  const nonce  = req.body.nonce;
  const amount = req.body.amount;
  const payment_type = req.body.method;
  const investment_type = req.body.investment_type;


  if(payment_type=="card"){
    gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: req.body.nonce,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
      if(result.success && result.transaction.status == 'submitted_for_settlement' && result.transaction.processorResponseCode =='1000' && result.transaction.processorResponseText == 'Approved'){
           //=======if transaction is authorized update investment data
           Investment.update({
             user_id:user_id,
             investment_amount:result.transaction.amount,
             investment_type:investment_type,
             investment_status:'pending',
             principal_transaction_id:result.transaction.id,
             principal_credited_status:'no',
             investment_date:Date.now(),
           },{where:{user_id:user_id}})
           .then(function(){
             //=========store transaction in depsosit table
             Deposit.create({
               user_id:user_id,
               transaction_id:result.transaction.id,
               transaction_status:result.transaction.status,
               transaction_amount:result.transaction.amount,
               transaction_credited:'no'

             })
             .then(function(){
               console.log('Just did what you asked');
             })


           })

      }else if(!result.success){
        console.log(util.inspect(result,false,null,true))
      }
    });

  }else if(payment_type="paypal"){
    var saleRequest = {
        amount: req.body.amount,
        paymentMethodNonce: req.body.nonce,
        orderId: "Mapped to PayPal Invoice Number",
        options: {
          submitForSettlement: true,
          paypal: {
            customField: "PayPal custom field",
            description: "Description for PayPal email receipt",
          },
        }
      };

gateway.transaction.sale(saleRequest, function (err, result) {
        if (err) {
          res.send("<h1>Error:  " + err + "</h1>");
        } else if (result.success) {
          res.send("<h1>Success! Transaction ID: " + result.transaction.id + "</h1>");
        } else {
          res.send("<h1>Error:  " + result.message + "</h1>");
        }
    });
}//else if


}


//=======================PUT CONTROLLERS=======================================//
module.exports.toggle_all_notifications = (req,res,next)=>{
 const user_id = user.getUserId(req,res,next);
 User.update({is_read:1},{where:{user_id:user_id}})
 .then(function(){
   return res.send('done');
 })
}


module.exports.resetPassword = function(req,res,next){
  const email    = req.body.email;
  const password = req.body.password;
  const hashedPassword = user.hashedPassword(password);

  User.update({password:hashedPassword},{where:{email:email}})
  .then(function(){
    return res.redirect('/login');
  })
}
// gateway.transaction.find("day7qzb0",function(err,transaction){
//   console.log(util.inspect(transaction.status,false,null,true));
// })
