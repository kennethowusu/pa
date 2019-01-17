const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//models
var User = require('../models/userModel');
const NOTIFICATION = require('../models/notificationModel.js');
const FINANCE       = require('../models/financeModel.js');
const INVESTMENT    = require('../models/investmentModel.js');

module.exports = {
 generateId : ()=>{
	return	crypto.randomBytes(5).toString('hex') + Date.now().toString();
},
  hashedPassword: function(plainPassword) {
    return bcrypt.hashSync(plainPassword, 10);
  },

  passwordIsCorrect: function(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash) ? true : false;
  },
   emailExist:function(email){
    return User.findOne({where:{email:email}})
     .then(function(person){
       if(person){
         return true;
       }else{
         return false;
       }
     })
     .catch(function(err){
       console.log(err)
     })
   },
  getDecodedToken: function(req, res, next) {
    const userToken = req.cookies.auth;

    var decoded = jwt.decode(userToken);
    return decoded; //verify token

  },
  getUserId:function(req, res, next) {
    const userToken = req.cookies.auth;

    var decoded = jwt.decode(userToken);
    return decoded.id; //verify token
  },
  getUser:function(req,res,next){
    return User.find({where:{user_id:module.exports.getDecodedToken(req,res,next).id}});
  },
  getUserByEmail:email=>{
    return User.findOne({where:{email:email}});
  },
  generateToken : function(req,res,next,person){
         const payload = {
           id:person.user_id
         }//payload

         const options = {
           expiresIn:"1h"
         }
         var token = jwt.sign(payload,process.env.JWTSECRET,options);

         //save token in cookie
         res.cookie('auth',token);
       },
  generateVerificationToken: function(req,res,next,person){
    const payload = {
      id:person.user_id
    }//payload

    const options = {
      expiresIn:"1h"
    }
    var token = jwt.sign(payload,process.env.JWTSECRET,options);
    return token;
  },
  isVerified:function(req,res,next){
    const user_id = module.exports.getUserId(req,res,next);
    User.find({where:{user_id:user_id}})
      .then(function(user){
        if(!user.is_verified){
          return res.redirect('/account/confirmation');
        }
      next();
      })

  },
   loggedIn: function(req,res,next){
     var userToken = req.cookies.auth;

      module.exports.tokenIsValid(userToken).then(function(result){
        if(result){
         return res.redirect('/account/summary');
        }
      next();
      })

   },
   requireAuth:(req,res,next)=>{
     var userToken = req.cookies.auth;

      module.exports.tokenIsValid(userToken).then(function(result){
        if(!result){
         return res.redirect('/');
        }
      next();
      })
   },
  tokenIsValid: function(userToken){
      //verify token
    return new Promise(function(resolve,reject){
      jwt.verify(userToken, process.env.JWTSECRET, function(err, decoded){
          if (!err) {
           resolve(true);
          } else {
           resolve(false);
          } //else
        })
    })

  },//tokenIsValid

  generateResetCode: function(){
    var resetCode = Math.floor(Math.random() * 899999 + 100000);
    return resetCode;
  },
  resetPassword:(newPassword,returnedUser)=>{
    //after password matches,replace old password with new password
    //hash password
    const newUserPassword = module.exports.hashedPassword(newPassword);
    returnedUser.password = newUserPassword;
  return  returnedUser.save();

},
 passwordHasExpired:(time)=>{

    const createdDate = new Date(time).getTime();
    const now = Date.now();

    const DateDifference = now - createdDate;

    const tenMinute = 600000;
    //check if date difference is greater than 10 minutes
    const expired = (DateDifference>tenMinute)? true : false;
    return expired;

 },

  make_referal_id:(firstname)=>{
   var referal_id = "";
   var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

   for (var i = 0; i < 4; i++)
     referal_id += possible.charAt(Math.floor(Math.random() * possible.length));

   const date = Date.now().toString();
   var firstname = firstname.toString().toLowerCase();
   var lastTwoChars = date.substr(-2);
   return firstname+referal_id+lastTwoChars;
 },
 getUserFinance:()=>{
   return FINANCE.find({where:{user_id:module.exports.getDecodedToken(req,res,next).id}});
 }

}
