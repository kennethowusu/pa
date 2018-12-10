var User = require('../models/userModel');
const NOTIFICATION = require('../models/notificationModel.js');
const FINANCE       = require('../models/financeModel.js');
const INVESTMENT    = require('../models/investmentModel.js');


const user = require('./userFunctions.js');

module.exports.deposit  = function(req,res,next,user_id,amount){
  user.get_user_and_finance(req,res,next)
  .then(function(result){
    const user      =        result;
    const finance   =        result.finance;
    FINANCE.update({deposit:finance.deposit+amount},{where:{user_id:user_id}})
    .then(()=>{
      console.log('deposite updated');
    })
  });
}
