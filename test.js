const user  = require('./functions/userFunctions');
const FINANCE = require('./models/financeModel');
const User = require('./models/userModel');
const money = require('money-math');
const user_id = 'f14ef426621544529886597';

//amount would have to be a string
module.exports.deposit = (user_id,amount)=>{
  FINANCE.findOne({where:{user_id:user_id}})
  .then(function(finance){
    return finance;
  })
  .then(function(finance){
    FINANCE.update({deposit:money.add(finance.deposit,amount)},{where:{user_id:user_id}})
  })
}

module.exports.withdraw = (user_id,amount)=>{
  FINANCE.findOne({where:{user_id:user_id}})
  .then(function(finance){
    return finance;
  })
  .then(function(finance){
    FINANCE.update({deposit:money.subtract(finance.deposit,amount)},{where:{user_id:user_id}})
  })
}

module.exports.withdraw(user_id,'0.10')
