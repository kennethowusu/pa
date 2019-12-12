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





module.exports.getSummaryIndexPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
    Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
    .then(function(notifications){
      return res.render('summary/index',{title:"Summary",
                    user:foundUser,notifications:notifications,moment:moment})
    })
  })
}


module.exports.getDashboardPage = (req,res,next)=>{
  return res.render('user/dashboard',{title:"Dashboard"});

}

module.exports.getInvest = (req,res,next)=>{

}

module.exports.getWithdrawPage = (req,res,next)=>{

}

module.exports.getHistoryPage = (req,res,next)=>{

}

module.exports.getReferralPage = (req,res,next)=>{

}


module.exports.getSettingsPage = (req,res,next)=>{

}
