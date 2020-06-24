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

const Finance      = require('../models/financeModel.js');
const Investment  = require('../models/investmentModel.js');




module.exports.getSettingsIndexPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
  
      return res.render('settings/index',
       {title:"Settings",user:foundUser,notifications:notifications,moment:moment})

  })
}


module.exports.changePassword = (req,res,next)=>{
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const user_id = user.getUserId(req,res,next)

  User.findOne({where:{user_id:user_id}})
    .then(function(foundUser){
      const userPassword = foundUser.password;
      if(!user.passwordIsCorrect(currentPassword,userPassword)){
         return res.send({confirmPasswordError : "yes"})
      }else{
        const changePassword  = user.hashedPassword(newPassword)
        User.update({password:changePassword},{where:{user_id:user_id}})
        .then(function(){
          return res.send({success:'yes'})
        })
      }
    })

}
