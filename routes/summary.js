var express = require('express');
var router = express.Router();
var summaryController  = require('../controllers/summaryController');
const user  = require('../functions/userFunctions');
const account = require("../functions/accountFunctions");
const util = require('util');

const FINANCE = require('../models/financeModel');
const User = require('../models/userModel');
const Investment = require('../models/investmentModel')
const money = require('money-math');
const Deposit = require('../models/depositModel')

const depsosit = require('../models/depositModel')
const mail = require('../mail/mail');





router.get('/name',
      user.requireAuth,
      user.isVerified,
      (req,res,next)=>{
         const userId = user.getUserId(req,res,next)

         User.findOne({where:{user_id:userId}})
         .then(foundUser=>{
           return res.send(foundUser)
         })
       })

module.exports = router;
