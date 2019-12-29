const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const user  = require('../functions/userFunctions');
const mail  = require('../mail/mail');
const util  = require('util');
const moment = require('moment')
const _   = require('lodash')
const CMC   = require('coinmarketcap-api')
require('dotenv').config();
const request = require('request')
//===============models==========================//
var User = require('../models/userModel');
const NOTIFICATION = require('../models/notificationModel.js');
const FINANCE       = require('../models/financeModel.js');
const INVESTMENT    = require('../models/investmentModel.js');

// const mail = require('../mail/mail');
require('dotenv').config();

//=============================GET CONTROLLERS======================//

//===========get index page ==============//
module.exports.getIndexPage = (req,res,next)=>{
  const i = req.query.i;
  if(i === "undefined"){
    i = "";
  }

  return res.render('index',{title:"Prime Axis LLC"});

}

//=======get signup page========================//
module.exports.getSignupPage = (req,res,next)=>{

  return res.render('register', { title: 'Create Account ' ,referee_id:req.query.ref});

}
//===================================sign up ============================//
module.exports.createUser = (req,res,next)=>{
  var referee_id = req.session.i;

  const newUser = {
     firstname : req.body.firstname,
     lastname : req.body.lastname,
     email : req.body.email,
     password : req.body.password,
     country: "",
     user_id : user.generateId(),
     referal_id:user.make_referal_id(req.body.firstname),
     referee_id: referee_id
  }




  const  hashedPassword =  user.hashedPassword(newUser.password);
  const returnUrl  = req.query.returnUrl;
  //check if user already exist
  user.emailExist(newUser.email)
    .then(function(result) {
      if (result) {
        const emailError  = "Email Already Exists";
        return res.send({error:"Email already Exists"});
      } else {
        //store user in database
            User.create({
              user_id  :      newUser.user_id,
              firstname:      newUser.firstname,
              lastname:       newUser.lastname,
              email:          newUser.email,
              password:       hashedPassword,
              country:        newUser.country,
              referal_id :    newUser.referal_id,
              referee_id:     newUser.referee_id
            }).then(newUser => {


              //=======================CREATE FINANCE FOR USER================//
                FINANCE.create({
                  user_id:newUser.user_id
                })
                .then(function(finance){
                  //=============CREATE FINANCE FOR USER===================//
                    INVESTMENT.create({
                      user_id:newUser.user_id
                    })
                    .then(function(notification){
                      //==========CREATE WELCOME NOTIFICATION FOR USER======//
                        const welcome_message = `Hi, ${newUser.firstname} you are welcome to prime axis `;

                        NOTIFICATION.create({
                          topic:"Welcome to Prime Axis LLC",
                          user_id:newUser.user_id,
                          message:welcome_message
                        }).
                        then(function(){
                          //===============SET ACCESS TOKEN AND REDIRECT===============//
                          user.generateToken(req, res, next, newUser);

                          //mail.sendEmailVerificationLink(newUser.email,url+verificationLink)

                        })
                        .then(function(){
                          if(referee_id){
                            User.find({where:{referal_id:referee_id}})
                            .then(function(refer_user){
                              if(refer_user){
                                NOTIFICATION.create({
                                  topic:"New User Registeration(Referral)",
                                  user_id : refer_user.user_id,
                                  message:`<p>${refer_user.firstname}, ${newUser.firstname} ${newUser.lastname} recently registered with your referal link</p>.
                                          You will receive 3% of whatever ${newUser.firstname} deposits`
                                })

                              }else{
                                return res.send({success:'/user/summary'});
                              }
                            })
                          }else{
                              return res.send({success:'/user/summary'});
                          }
                        })
                    })

                })

            })
          .catch(err => {
            console.log(err)
          })
      } //else
    })
}


//===============================sign in==================//
module.exports.signin = function(req, res, next){
  //var userToken = req.cookies.auth;
  //implement sign in
  var email = req.body.email;
  var password = req.body.password;
  const sign_in_mail_error = "Email does not exist";
  // //check if email exist;


  User.findOne({
      where: {
        email: email
      }
    })
    .then(person => {
      if (!person) {
        return res.send({error:"Invalid Email or Password"})
      }
      if (!user.passwordIsCorrect(password, person.password)) {
        return res.send({error:"Invalid Email or Password"});
      } else {
        var token = user.generateToken(req, res, next, person);

         return res.send({success:true})
        //redirect to a url
      } //else
    }) //then

} //module.exports
//===================log out===========================//
module.exports.logout = function(req,res,next){
  var clear_cookie = new Promise(function(resolve,reject){
    res.clearCookie('auth', { path: '/' });
    resolve('cookie cleared');
  })
  .then(function(result){
    return res.redirect('/');
  })
  .catch(function(err){
    console.log(err);
  })
}



module.exports.getFaqsPage = (req,res,next)=>{
  return res.render('faqs',{title:"Frequently Asked Questions"});
}

module.exports.getSupportPage = (req,res,next)=>{
  return res.render('support',{title:"Support"});
}
