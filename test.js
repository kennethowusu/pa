const Sequelize = require('sequelize');
const sequelize = require('./config/database');
const user  = require('./functions/userFunctions');
const FINANCE = require('./models/financeModel');
const User = require('./models/userModel');
const Investment = require('./models/investmentModel')
const depsosit = require('./models/depositModel')
const amount = '100.00' * '0.03'
const money = require('money-math');
const interest = '0';
const CMC = require('coinmarketcap-api');
const cmc = new CMC();
const moment = require('moment');


// FINANCE.update({ interest: sequelize.literal('principal * 0.01 + interest')
// ,times_credited:sequelize.literal('times_credited+1') },
// { where: { investment_type: 'gold-plan',times_credited:{lt:6} } })
//
// FINANCE.update({ interest: sequelize.literal('principal + interest * 0.01 + interest')
// ,times_credited:sequelize.literal('times_credited+1') },
// { where: { investment_type: 'gold-plan',times_credited:{gte:6} } })

// var date   =  moment(new Date('01-07-2019'));
// var compare_date = moment(new Date('01-28-2019'))
// console.log(compare_date.diff(date,'weeks'))

// sequelize.query(`UPDATE finances
//   SET principal =
//   IF(times_credited >= 6,principal + interest,principal)
//   WHERE investment_type = 'gold-plan' OR investment_type = 'diamond-plan' OR investment_type = 'platinum-plan' `)
//   .then(function(result){
//   console.log('yeah!')
// })
