const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const mail = require('../mail/mail');
require('dotenv').config();













module.exports.getReferralPage = (req,res,next)=>{
  res.render('account/referral',{title:"referral page"});
}
