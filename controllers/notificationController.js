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

const Finance       = require('../models/financeModel.js');
const Investment    = require('../models/investmentModel.js');
const Deposit       = require('../models/depositModel');
const PaymentDetail = require('../models/paymentDetailModel');
const PaymentRequest = require('../models/paymentRequestModel')
const moment        = require('moment');
//==============variables=============/






module.exports.getNotificationIndexPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){

  Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
    .then(function(notifications){


        Notification.findAll({where:{user_id:user_id},order:[['createdAt','DESC']]})
          .then(function(notices){
            return res.render('notification/index',{title:"Notifications",
            user:foundUser,money:money,moment:moment,notifications:notifications,notices:notices})
          })
    })
  })
}


module.exports.getSingleNoticationPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  const id = req.params.id;
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){

  Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
    .then(function(notifications){
      Notification.findOne({where:{id:req.params.id,user_id:user_id}})
      .then(function(singleNote){
        if(!singleNote){
          return res.redirect('/account/summary');
        }else{
          return res.render('notification/notification',{title:"Notifications",user:foundUser,money:money,moment:moment,
          notifications:notifications,singleNote:singleNote})
        }
      })
      })
  })
}

module.exports.readNotification = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)

  User.update({is_read:1},{where:{user_id:user_id}})
    .then(function(){
      return res.send({success:'yes'})
    })
}

module.exports.readSingleNote = (req,res,next)=>{
  const noteId = req.body.noteId;
  const user_id = user.getUserId(req,res,next)

  Notification.update({is_read:1},{where:{id:noteId,user_id:user_id}})
    .then(function(){
      return res.send('ok')
    })
}
