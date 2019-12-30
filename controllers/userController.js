const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const user  = require('../functions/userFunctions');
const async = require('async');
const truncate = require('truncate');
const money    = require('money-math');
const util   = require('util');
const mail    =  require('../mail/mail');

const sequelize = require('../config/database')





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
                             moment:moment,
                             truncate:truncate
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

          //var client = new Bitpay.Client({ apiKey: process.env.BITPAY_API_KEY });




                 if(!foundUser.finance.investment_type){
                   return res.render('user/investc',{
                                   title:"Invest",
                                   user:foundUser,
                                   page:'invest',
                                   notifications:notifications,
                                   moment:moment,
                                   truncate:truncate
                               })
                 }else{
                   return res.render('user/topup',{
                                   title:"Top Up",
                                   user:foundUser,
                                   page:'invest',
                                   notifications:notifications,
                                   moment:moment,
                                   truncate:truncate
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
                                   notifications:notifications,
                                   truncate:truncate,
                                   moment:moment
                               })
                 }else{
                   return res.render('user/withdraw',{
                                   title:"Withdraw",
                                   user:foundUser,
                                   page:'withdraw',
                                   notifications:notifications,
                                   money:money,
                                   moment:moment,
                                   truncate:truncate
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
                             moment:moment,
                             truncate:truncate
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
                            referrals:referrals,
                            truncate:truncate
                        })

          })



                //return res.send({user:foundUser})
        })
  })


}


module.exports.getSettingsPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
        Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
        .then(function(notifications){

           Earning.findAll({limit:5,where:{user_id:user_id},order:[['createdAt','DESC']]})
           .then(function(earnings){
             return res.render('user/settings',{
                             title:"Settings",
                             user:foundUser,
                             page:'settings',
                             notifications:notifications,
                             earnings:earnings,
                             moment:moment,
                             truncate:truncate
                         })

             //return res.send({user:foundUser})
           })
        })
  })

}


module.exports.getNotificationPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  const notificationId = req.params.notificationId;

  User.findOne({where:{user_id:user_id},include:[{all:true}]})
  .then(function(foundUser){
        Notification.findAll({limit:3,where:{user_id:user_id},order:[['createdAt','DESC']]})
        .then(function(notifications){

           Notification.findOne({where:{user_id:user_id,id:notificationId}})
           .then(function(notification){
             if(!notification){
               return res.render('user/dashboard')
             }else{
               return res.render('user/notification',{
                               title:"Notification",
                               user:foundUser,
                               page:'notification',
                               notifications:notifications,
                               notification:notification,
                               moment:moment,
                               truncate:truncate
                           })
             }

             //return res.send({user:foundUser})
           })
        })
  })

}
















module.exports.changeAccountName = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  User.update({firstname:firstname,lastname:lastname},{where:{user_id:user_id}})
  .then(function(){
    return res.send({success:"Account name updated successfully"});
  })
}



module.exports.changePassword = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword

  User.findOne({where:{user_id:user_id}})
    .then(function(foundUser){
      const userPassword = foundUser.password;
      if(!user.passwordIsCorrect(password,userPassword)){
         return res.send({error: "Current password is incorrect"})

      }else{
        const changePassword  = user.hashedPassword(newPassword)
        User.update({password:changePassword},{where:{user_id:user_id}})
        .then(function(){
          return res.send({success:'Password updated successfully'})
        })
      }
    })

}


module.exports.getEarnings = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next)
  let from = req.query.from;
  let  to = req.query.to;

  from  = moment(from).format("YYYY-MM-DD HH:mm:ss")
  to    = moment(to).format("YYYY-MM-DD HH:mm:ss")

  sequelize.query(
    `SELECT * FROM earnings
     WHERE user_id = '${user_id}'  AND createdAt BETWEEN '${from}' AND '${to}'`
  )
  .then(function(earnings){
    console.log(earnings)
  })

}
