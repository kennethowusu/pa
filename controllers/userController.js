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
const moment        = require('moment');







module.exports.getDashboardPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
        Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
        .then(function(notifications){
                return res.render('user/dashboard',{
                                title:"Summary",
                                user:foundUser,
                                page:'dashboard',
                                notifications:notifications,
                                moment:moment
                            })

                //return res.send({user:foundUser})
        })
  })


}//getDashboardPage

module.exports.getInvestPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
        Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
        .then(function(notifications){
                return res.render('user/invest',{
                                title:"Referral",
                                user:foundUser,
                                page:'referral',
                                notifications:notifications,
                                moment:moment
                            })

                //return res.send({user:foundUser})
        })
  })

}

module.exports.getWithdrawPage = (req,res,next)=>{

}

module.exports.getHistoryPage = (req,res,next)=>{

}

module.exports.getReferralPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
        Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
        .then(function(notifications){
                return res.render('user/referral',{
                                title:"Referral",
                                user:foundUser,
                                page:'referral',
                                notifications:notifications,
                                moment:moment
                            })

                //return res.send({user:foundUser})
        })
  })


}


module.exports.getSettingsPage = (req,res,next)=>{

}
