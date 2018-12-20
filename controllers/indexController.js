const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const user  = require('../functions/userFunctions');
const mail  = require('../mail/mail');

require('dotenv').config();
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

  // return res.render('index',{title:"Prime Axis LLC",i:i});
   return res.redirect('/login');
}
//=======get signup page========================//
module.exports.getSignupPage = (req,res,next)=>{
  res.render('register', { title: 'Create Account|Prime ' ,referee_id:req.query.ref});

}
//===================================sign up ============================//
module.exports.createUser = (req,res,next)=>{
  const newUser = {
     firstname : req.body.firstname,
     lastname : req.body.lastname,
     email : req.body.email,
     password : req.body.password,
     country: req.body.country,
     user_id : user.generateId(),
     referal_id:user.make_referal_id(req.body.firstname),
     referee_id: req.body.i
  }


  const  hashedPassword =  user.hashedPassword(newUser.password);
  const returnUrl  = req.query.returnUrl;
  //check if user already exist
  user.emailExist(newUser.email)
    .then(function(result) {
      if (result) {
        const emailError  = "Email Already Exists";
        return res.send({email_error:emailError});
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
              // user.generateToken(req, res, next, newUser);
              // return res.send({success:'/account'});

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
                          user_id:newUser.user_id,
                          message:welcome_message
                        }).
                        then(function(){
                          //===============SET ACCESS TOKEN AND REDIRECT===============//
                          user.generateToken(req, res, next, newUser);
                          const verificationLink = user.generateVerificationToken(req,res,next,newUser);
                          mail.sendEmailVerificationLink(newUser.email,verificationLink)
                          return res.send({success:'/account/summary'});
                        })
                    })

                })

            })
          .catch(err => {
            return res.send(err);
          })
      } //else
    })
}


//===============================sign in==================//
module.exports.signin = function(req, res, next){
  var userToken = req.cookies.auth;
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
        return res.send({sign_in_mail_error:sign_in_mail_error})
      }
      if (!user.passwordIsCorrect(password, person.password)) {
        return res.send({sign_in_password_error:"Password is  incorrect"});
      } else {
        var token = user.generateToken(req, res, next, person);
        //send this for the cookie to work
        res.send({success:'/account/summary'});
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
    return res.redirect('/login');
  })
  .catch(function(err){
    console.log(err);
  })
}
