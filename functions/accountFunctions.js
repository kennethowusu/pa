var User = require('../models/userModel');
const money = require('money-math')
const NOTIFICATION = require('../models/notificationModel.js');
const FINANCE       = require('../models/financeModel.js');
const INVESTMENT    = require('../models/investmentModel.js');

//=========================time in milliseconds=========================//
const two_weeks = 1209600000;

const user = require('./userFunctions.js');

module.exports.deposit  = function(req,res,next,user_id,amount){
  user.get_user_and_finance(req,res,next)
  .then(function(result){
    const user      =        result;
    const finance   =        result.finance;
    FINANCE.update({deposit:money.add(finance.deposit,1000)},{where:{user_id:user_id}})
    .then(()=>{
      console.log('deposite updated');
    })
  });
}
