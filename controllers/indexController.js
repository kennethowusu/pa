const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const user  = require('../functions/userFunctions');

//===============models==========================//
var User = require('../models/userModel');
// const mail = require('../mail/mail');
require('dotenv').config();


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
     referee_id: req.body.referee_id
  }
  console.log(newUser);

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
        User.sync({
            force: true
          }).then(() => {
            User.create({
              user_id  :      newUser.user_id,
              firstname:      newUser.firstname,
              lastname:       newUser.lastname,
              email:          newUser.email,
              password:       hashedPassword,
              country:        newUser.country,
              referal_id :    newUser.referal_id,
              referee_id:     newUser.referee_id
            }).then(person => {
              // user.generateToken(req, res, next, person);
              return res.send({success:'/account'});

            })
          })
          .catch(err => {
            return res.send(err);
          })
      } //else
    })


}
