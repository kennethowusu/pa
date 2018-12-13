const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const user  = require('../functions/userFunctions');
const async = require('async');
const truncate = require('truncate');
// const mail = require('../mail/mail');
require('dotenv').config();


//===========models================//
var User = require('../models/userModel');
const Notification = require('../models/notificationModel.js');
const Finance       = require('../models/financeModel.js');
const Investment    = require('../models/investmentModel.js');
const moment        = require('moment');
//==============variables=============/










module.exports.getSummaryPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3}]
  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      console.log(count)
      return res.render('account/summary',{title:'Account Summary',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count})
    })//Notificatin.findAndCountAll
  })//then(person)
}
module.exports.getReferralPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3}]
  })
  .then((person)=>{

    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
    then(function(count){
      const ref_url = req.protocol + '://' + req.get('host') + '?i=' + person.referal_id;
      return res.render('account/referral',{title:'Account Referral',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count,ref_url:ref_url})
    })//Notificatin.findAndCountAll
  })//then(person)
}
















//=======================PUT CONTROLLERS=======================================//
module.exports.toggle_all_notifications = (req,res,next)=>{
 const user_id = user.getUserId(req,res,next);
 User.update({is_read:1},{where:{user_id:user_id}})
 .then(function(){
   return res.send('done');
 })
}
