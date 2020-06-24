const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const mail  = require('../mail/mail');
const util  = require('util');
const moment = require('moment')
const money = require('money-math')
const CMC   = require('coinmarketcap-api')
const user  = require('../functions/userFunctions');
require('dotenv').config();
const request = require('request')
//===============models==========================//
var User = require('../models/userModel');

const Finance      = require('../models/financeModel.js');
const Investment  = require('../models/investmentModel.js');


var notification = [];


module.exports.getInvestmentIndexPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){

      return res.render('investment/index',

  })
}


module.exports.getDepositPage = (req,res,next)=>{
  const package = req.query.package;
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){

      return res.render('investment/deposit',
      {title:"Deposit",user:foundUser,package:package,notifications:notifications,moment:moment})

  })
}

module.exports.getTopupPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){

      return res.render('investment/topup',
      {title:"Top Up",user:foundUser,notifications:notifications,moment:moment})

  })
}


module.exports.confirmPayment = (req,res,next)=>{
  console.log(req.body)
}
