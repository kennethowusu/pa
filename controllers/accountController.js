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
//==============variables=============/




const braintree = require("braintree");

const  gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "5fz7nmmw96d5xp5m",
  publicKey: "pr4b4pyxkgk8qz4d",
  privateKey: "122b3988a3e1d13910c07aff551aae3e"
});




//=======================GET CONROLLERS=============//

module.exports.getConfirmationPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);
  User.find({where:{user_id:user_id}})
  .then(function(person){
    if(!person.is_verified){
      return res.render('account/confirmation',{title:'Account Confirmation',person:person});
    }else{
      return res.redirect('/account/summary');
    }
  })
}

module.exports.verifyEmail  = (req,res,next)=>{
  const token = req.params.token;

  var decoded = jwt.decode(token);
  const user_id = decoded.id;
  User.update({is_verified:1},{where:{user_id:user_id}})
    .then(function(){
      return res.render('account/email-verified',{title:"Account Verified"});
    })
}

module.exports.getPlanModal = (req,res,next)=>{
  return res.render('account/plan-modal');
}
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
      return res.render('account/summary',{title:'Account Summary',
      user:person,notifications:person.notifications,
      moment:moment,truncate:truncate,notification_count:count,
      finance:person.finance})
    })//Notificatin.findAndCountAll
  })//then(person)
}
module.exports.getReferralPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3},
      {model:Finance,where:{user_id:user_id},required:true}
    ]
  })
  .then((person)=>{
     User.findAndCountAll({where:{referee_id:person.referal_id}})
     .then(function(num_ref_count){
       Notification.findAndCountAll({where:{user_id:user_id,is_read:0}}).
       then(function(count){
         console.log(num_ref_count)
         const ref_url = req.protocol + '://' + req.get('host') + '?i=' + person.referal_id;
         return res.render('account/referral',{title:'Account Referral',
         user:person,notifications:person.notifications,
         moment:moment,truncate:truncate,notification_count:count,ref_url:ref_url,
         finance:person.finance,num_ref_count:num_ref_count})
       })//Notificatin.findAndCountAll
     })

  })//then(person)
}



module.exports.confirmResetPasswordToken = (req,res,next)=>{
  const token = req.params.token;

  var decoded = jwt.decode(token);
  const user_id = decoded.id;
  User.find({where:{user_id:user_id}})
    .then(function(user){
      return res.render('password-reset',{title:"Password Reset",email:user.email});
    })
}







module.exports.getNotificationPage = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);
  const notification_id = req.params.id;

  User.findOne({where:{user_id:user_id},
    include: [{model: Notification,where: {user_id:user_id},
      required: true,order:[['createdAt','DESC']],count:{where:{is_read:0}},limit:3},
      {model:Investment,where:{user_id:user_id},required:true},
      {model:Finance,where:{user_id:user_id},required:true}

    ]

  })
  .then((person)=>{


    Notification.findAndCountAll({where:{user_id:user_id,is_read:0}})
    .then(function(count){


          Notification.update({is_read:1},{where:{id:notification_id}});
          Notification.findOne({where:{id:notification_id}})
          .then(function(note){
             console.log(note)
            return res.render('account/notification',{title:'Notification',
            user:person,notifications:person.notifications,
            moment:moment,truncate:truncate,notification_count:count,
            investment:person.investment,finance:person.finance,note:note


            })


      })

    })
  })//then(person);
}





//=================POST CONTROLLERS=====================//
module.exports.sendPasswordResetLink = (req,res,next)=>{
  const email  = req.body.email;

 const  url = req.protocol + '://' + req.get('host') + '/account/password/reset/';
  User.find({where:{email:email}})
      .then(function(person){
        if(person == null){
          return res.send('Email does not exist');
        }else{
          const passwordResetLink = user.generateVerificationToken(req,res,next,person);
          mail.sendPasswordResetLink(person.email,url+passwordResetLink);
          return res.send('Your password reset link has been set,please check your mail box');
        }
      })
}



module.exports.sendCryptoPayment = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);
  const address = req.body.address;
  const type    = req.body.type;
  const transaction_id = req.body.transaction_id;

  User.find({where:{user_id:user_id}})
  .then(function(user){
    const email = user.email;
    try{
      mail.sendCryptoPayment(email,type,address,transaction_id)
    }catch(err){
      console.log(err.message)
    }
  })

}

module.exports.topupCryptoPayment = (req,res,next)=>{
  const user_id = user.getUserId(req,res,next);
  const address = req.body.address;
  const type    = req.body.type;
  const transaction_id = req.body.transaction_id;
  const amount      = req.body.amount;

  User.find({where:{user_id:user_id}})
  .then(function(user){
    const email = user.email;
    try{
      mail.topupCryptoPayment(email,type,address,transaction_id,amount);
      return res.send('yeah')
    }catch(err){
      console.log(err.message)
    }
  })
}
//=======================PUT CONTROLLERS=======================================//
module.exports.toggle_all_notifications = (req,res,next)=>{
 const user_id = user.getUserId(req,res,next);
 User.update({is_read:1},{where:{user_id:user_id}})
 .then(function(){
   return res.send('done');
 })
}

module.exports.makeNotificationRead = (req,res,next)=>{
  const note_id = req.params.id;
  Notification.update({is_read:1},{where:{id:note_id}})
  .then(function(result){
    return res.send('read');
  })
}
module.exports.resetPassword = function(req,res,next){
  const email    = req.body.email;
  const password = req.body.password;
  const hashedPassword = user.hashedPassword(password);

  User.update({password:hashedPassword},{where:{email:email}})
  .then(function(){
    return res.redirect('/login');
  })
}
// gateway.transaction.find("day7qzb0",function(err,transaction){
//   console.log(util.inspect(transaction.status,false,null,true));
// })
