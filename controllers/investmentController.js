const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const user  = require('../functions/userFunctions');
const mail  = require('../mail/mail');
const util  = require('util');
const moment = require('moment')
const CMC   = require('coinmarketcap-api')
require('dotenv').config();
const request = require('request')
//===============models==========================//
var User = require('../models/userModel');
const Notification = require('../models/notificationModel.js');
const Finance      = require('../models/financeModel.js');
const Investment  = require('../models/investmentModel.js');




module.exports.getInvestmentIndexPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
    Notification.findAll()
    .then(function(){
      return res.render('investment/index',{title:"Investment",user:foundUser})
    })
  })
}


module.exports.getDepositPage = (req,res,next)=>{
  const package = req.query.package;
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
    Notification.findAll()
    .then(function(){
      return res.render('investment/deposit',{title:"Deposit",user:foundUser,package:package})
    })
  })
}

module.exports.getTopupPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
    Notification.findAll()
    .then(function(){
      return res.render('investment/topup',{title:"Top Up",user:foundUser})
    })
  })
}


module.exports.confirmPayment = (req,res,next)=>{
  console.log(req.body)
}
