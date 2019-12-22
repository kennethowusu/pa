const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
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
const Earning       = require('../models/dailyEarningsModel')
const moment        = require('moment');







module.exports.getDashboardPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
        Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
        .then(function(notifications){

           Earning.findAll({limit:5,where:{user_id:user_id},order:[['createdAt','DESC']]})
           .then(function(earnings){
             return res.render('user/dashboard',{
                             title:"Summary",
                             user:foundUser,
                             page:'dashboard',
                             notifications:notifications,
                             earnings:earnings,
                             moment:moment
                         })

             //return res.send({user:foundUser})
           })
        })
  })


}//getDashboardPage

module.exports.getInvestPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
        Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
        .then(function(notifications){

                 if(!foundUser.finance.investment_type){
                   return res.render('user/invest',{
                                   title:"Referral",
                                   user:foundUser,
                                   page:'invest',
                                   notifications:notifications,
                                   moment:moment
                               })
                 }else{
                   return res.render('user/topup',{
                                   title:"Referral",
                                   user:foundUser,
                                   page:'invest',
                                   notifications:notifications,
                                   moment:moment
                               })
                 }


                //return res.send({user:foundUser})
        })
  })

}

module.exports.getWithdrawPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
        Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
        .then(function(notifications){

                 if(!foundUser.finance.investment_type){
                   return res.render('user/not-invest',{
                                   title:"Withdraw",
                                   user:foundUser,
                                   page:'withdraw',
                                   notifications:notifications
                               })
                 }else{
                   return res.render('user/withdraw',{
                                   title:"Withdraw",
                                   user:foundUser,
                                   page:'withdraw',
                                   notifications:notifications,
                                   money:money,
                                   moment:moment
                               })
                 }


                //return res.send({user:foundUser})
        })
  })

}

module.exports.getHistoryPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
        Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
        .then(function(notifications){

           Earning.findAll({limit:5,where:{user_id:user_id},order:[['createdAt','DESC']]})
           .then(function(earnings){
             return res.render('user/history',{
                             title:"History",
                             user:foundUser,
                             page:'history',
                             notifications:notifications,
                             earnings:earnings,
                             moment:moment
                         })

             //return res.send({user:foundUser})
           })
        })
  })


}

module.exports.getReferralPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
        const refUrl = req.protocol + '://' + req.get('host') + '?i=' + foundUser.referal_id;
        Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
        .then(function(notifications){

          User.findAndCountAll({where:{referee_id:foundUser.referal_id}})
          .then(function(referrals){
            return res.render('user/referral',{
                            title:"Referral",
                            user:foundUser,
                            page:'referral',
                            notifications:notifications,
                            moment:moment,
                            refUrl:refUrl,
                            referrals:referrals
                        })

          })



                //return res.send({user:foundUser})
        })
  })


}


module.exports.getSettingsPage = (req,res,next)=>{

}
