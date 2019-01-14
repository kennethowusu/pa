const sequelize = require('sequelize');
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


//
// FINANCE.update({ interest: sequelize.literal('principal * 0.01 + interest')
// ,times_credited:sequelize.literal('times_credited+1') },
// { where: { investment_type: 'gold-plan',times_credited:{lt:6} } })
//
// FINANCE.update({ interest: sequelize.literal('principal + interest * 0.01 + interest')
// ,times_credited:sequelize.literal('times_credited+1') },
// { where: { investment_type: 'gold-plan',times_credited:{gte:6} } })


const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    start: 1,
    limit: 10,
    convert: 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'ad9410ba-172b-4f51-866b-5812dccf5271'
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
console.log('API call response:', response.data);

// var filter = response.data.filter(function(crypto){
//   return crypto.id == 1  || crypto.id == 3;
// })
// console.log(filter)
}).catch((err) => {
console.log('API call error:', err.message);
});
