const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const user  = require('../functions/userFunctions');
const async = require('async');
const truncate = require('truncate');
const money    = require('money-math');
// const mail = require('../mail/mail');
require('dotenv').config();


//===========models================//
var User = require('../models/userModel');
const Notification = require('../models/notificationModel.js');
const Finance       = require('../models/financeModel.js');
const Investment    = require('../models/investmentModel.js');
const moment        = require('moment');
//==============variables=============/




const braintree = require("braintree");

const  gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "5fz7nmmw96d5xp5m",
  publicKey: "pr4b4pyxkgk8qz4d",
  privateKey: "122b3988a3e1d13910c07aff551aae3e"
});






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
      console.log(count)
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
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3}]
  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      console.log(count)
      return res.render('account/withdraw',{title:'Withdraw',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count})
    })//Notificatin.findAndCountAll
  })//then(person);
}


module.exports.getDepositPage  = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);

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
        token:response.clientToken})
    })

    })//Notificatin.findAndCountAll
  })//then(person)
}

module.exports.getInvestmentPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3}]
  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      console.log(count)
      return res.render('account/investment',{title:'Investment',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count})
    })//Notificatin.findAndCountAll
  })//then(person)
}




//=================POST CONTROLLERS=====================//
module.exports.deposit = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);
  const nonce  = req.body.nonce;
  const amount = req.body.amount;
  payment_type = req.body.method;

  if(payment_type=="card"){
    gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: req.body.nonce,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
      if(result.success){
        Finance.findOne({where:{user_id:user_id}}).then(function(finance){
          Finance.update({deposit:money.add(finance.deposit,result.transaction.amount)},{where:{user_id:user_id}})
          .then(function(){
            Notification.create({
              topic:"Deposit",
              message: `You have deposited an amount of  <b>${result.transaction.amount}</b>
                        in your account. Your balance is now
                        <b>${money.add(finance.deposit,result.transaction.amount)}</b>`,
              user_id:user_id,
              is_read:0
            }).then(function(){
              return res.send(result);
            })


          })

        })

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
