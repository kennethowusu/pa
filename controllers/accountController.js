const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mail = require('../mail/mail');
require('dotenv').config();


//===================================sign up ============================//
module.exports.signup = ()=>{
  const newUser = {
     firstname : req.body.firstname,
     lastname : req.body.lastname,
     email : req.body.email,
     password : req.body.password,
     country: req.body.country,
     referee_id: req.body.country,
  }
}
