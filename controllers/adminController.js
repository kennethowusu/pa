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


//=================GET ROUTES=======================//
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
      return res.render('admin/summary',{title:'Account Summary',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count,
      finance:person.finance})
    })//Notificatin.findAndCountAll
  })//then(person)

}

module.exports.getDailyInterest = (req,res,next)=>{

  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3},
      {model:Finance,where:{user_id:user_id},required:true}]
  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      return res.render('admin/daily-interest',{title:'Account Summary',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count,
      finance:person.finance})
    })//Notificatin.findAndCountAll
  })//then(person)

}

module.exports.getPaymentRequest = (req,res,next)=>{

  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3},
      {model:Finance,where:{user_id:user_id},required:true}]
  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      return res.render('admin/payment-requests',{title:'Account Summary',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count,
      finance:person.finance})
    })//Notificatin.findAndCountAll
  })//then(person)

}

module.exports.getPaymentConfirmation = (req,res,next)=>{

  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3},
      {model:Finance,where:{user_id:user_id},required:true}]
  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      return res.render('admin/payment-confirmation',{title:'Account Summary',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count,
      finance:person.finance})
    })//Notificatin.findAndCountAll
  })//then(person)

}
