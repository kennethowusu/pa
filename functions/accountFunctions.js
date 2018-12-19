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

module.exports.verifyInvestmentPackage = ()=>{
  Investment.find({where:{user_id:user_id}})
  .then(function(investment){
    //check if investment status is active
    const transaction_id = investment.principal_transaction_id;
    if(investment.status=='inactive' || investment.investment_type==null){
      console.log("he's not on any investment package")
    }
    else if(investment.investment_status == 'active' && investment.principal_credited_status=='yes'){
      console.log('he has settled us let him go')
      return;
    }
    else if(investment.investment_status == 'active' && investment.principal_credited_status == 'no'){
        gateway.transaction.find(transaction_id,function(err,transaction){
          if(transaction.status=="settled"){
            Investment.update({principal_credited_status:'yes'},{where:{user_id:user_id}});
            Deposit.update({transaction_status:transaction.status},{where:{transaction_id:transaction_id}})
          }
          //cancel investment packages when it settlement fails
          else if(transaction.status=="failed"
                || transaction.status=="processor_declined"
                || transaction.status=="gateway_rejected"
                || transaction.status=="settlement_declined"
                || transaction.status == "authorization_expired" ){
                  Investment.update({
                    investment_type:null,
                    investment_amount:null,
                    investment_date:null,
                    investment_status:'inactive',
                    principal_transaction_id:null,
                    principal_credited_status:'no',
                  },{where:{user_id:user_id,principal_transaction_id:transaction_id}})
                  .then(function(){
                    //send user notification
                    //send user email Notification
                    console.log('investment package destroyed');
                  })
                }

        })//gateway.transaction.find
    }//if investment.status=='active'
  })//investment.find
}
