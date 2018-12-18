const user  = require('./functions/userFunctions');
const FINANCE = require('./models/financeModel');
const User = require('./models/userModel');
const Investment = require('./models/investmentModel')
const money = require('money-math');

const depsosit = require('./models/depositModel')
//
// result.true &&
//
//  result.transaction.status == 'submitted_for_settlement'
//  && result.transaction.processorResponseCode =='1000'
//  && result.transaction.processorResponseText == 'Approved'
// Finance.findOne({where:{user_id:user_id}}).then(function(finance){
//   Finance.update({deposit:money.add(finance.deposit,result.transaction.amount)},{where:{user_id:user_id}})
//   .then(function(){
//     Notification.create({
//       topic:"Deposit",
//       message: `You have deposited an amount of  <b>${result.transaction.amount}</b>
//                 in your account. Your balance is now
//                 <b>${money.add(finance.deposit,result.transaction.amount)}</b>`,
//       user_id:user_id,
//       is_read:0
//     }).then(function(){
//       // return res.send(result);
//       console.log(util.inspect(result,false,null,true));
//     })
//
//
//   })
//
// })
