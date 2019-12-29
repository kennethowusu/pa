const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const user  = require('../functions/userFunctions');
const async = require('async');
const truncate = require('truncate');
const money    = require('money-math');
const util   = require('util');
const mail    =  require('../mail/mail');
const colors = require('colors')

// const mail = require('../mail/mail');
require('dotenv').config();


//===========models================//
var User = require('../models/userModel');
const Notification = require('../models/notificationModel.js');
const Finance       = require('../models/financeModel.js');
const Investment    = require('../models/investmentModel.js');
const Deposit       = require('../models/depositModel');
const PaymentDetail = require('../models/paymentDetailModel');
const PaymentRequest = require('../models/paymentRequestModel')
const Payment        = require('../models/paymentModel');
const moment        = require('moment');
//==============variables=============/








module.exports.getWithdrawHistoryPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){

    Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
    .then(function(notifications){

       Payment.findAll({where:{user_id:user_id}})
       .then(function(payments){
         return res.render('withdraw/withdrawal-history',
         {title:"Withdraw",user:foundUser,money:money,notifications:notifications,payments:payments,moment:moment})
       })

    })
  })
}







//===========================POST ROUTES========================================//
module.exports.postWithDrawalRequest = (req,res,next)=>{
  const user_id      =  user.getUserId(req,res,next)
  const paymentOption = req.body.paymentMode;
  const amount        = req.body.amount;
  const paymentAddress = req.body.address

  //==============Create payment============//

    //===============find user and all details================//
    User.findOne({where:{user_id:user_id},include:[{all:true}]})
    .then(function(foundUser){
       const totalFunds = money.add(foundUser.finance.principal,foundUser.finance.interest);
       const maximumWithdrawal = 0.05 * totalFunds;
       const maximumAmount = maximumWithdrawal.toFixed(2);
       console.log('Everything worked'.green)
       if(parseFloat(amount) > parseFloat(maximumAmount)){
         return res.send({error: `$${amount} is greater than your maximum withdrawal amount of $${maximumAmount}`})
       }else{
           mail.sendEmailVerificationLink(foundUser.firstname + " " + foundUser.lastname,process.env.receiveEmail,amount)

         //================Create payment request for user==================//
         PaymentRequest.create({
           username: `${foundUser.firstname} ${foundUser.lastname}`,
           userpackage: foundUser.finance.investment_type,
           user_id:user_id,
           balance: money.add(foundUser.finance.principal,foundUser.finance.interest),
           status:'pending',
           paymentType:paymentOption,
           paymentAddress:paymentAddress,
           amount:amount
         })

         .then(function(){
           Notification.create({
             topic:"Withdrawal Request Received",
             message:'Your request for withdrawal has been received,you will receive a notice... complete',
             user_id:user_id,
             is_read:0
           })
           .then(function(){
             User.update({is_read:0},{where:{user_id:user_id}})
             .then(function(){


               Finance.update({
                 withdrawal_status:'pending'},
                 {where:{user_id:user_id}}
               )
               .then(function(){
                 return res.send({success:'yes'});
               })
             })
           })

         })

       }

    })



}
