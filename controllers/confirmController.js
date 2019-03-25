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




module.exports.getConfirmationPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
      if(foundUser.is_verified == '1'){
        return res.redirect('/account/summary');
      }else{
        return res.render('confirm/index',
         {title:"Email Confirmation",user:foundUser,moment:moment})
      }

  })
}


module.exports.resendConfirmationLink = (req,res,next)=>{
  const  user_id = user.getUserId(req,res,next);
  const  url = req.protocol + '://' + req.get('host') + '/account/confirmation/verification/';
  User.find({where:{user_id:user_id}})
      .then(function(person){
        const verificationLink = user.generateVerificationToken(req,res,next,person);
        mail.sendEmailVerificationLink(person.email,url+verificationLink);
      }).then(function(){
        return res.send('sent');
      })
}

module.exports.verifyEmail = (req,res,next)=>{
  const token = req.params.token;

  var decoded = jwt.decode(token);
  const user_id = decoded.id;
  User.update({is_verified:1},{where:{user_id:user_id}})
    .then(function(){
      return res.render('confirm/email-verified',{title:"Account Verified"});
    })
}
