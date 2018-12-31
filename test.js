// const user  = require('./functions/userFunctions');
// const FINANCE = require('./models/financeModel');
// const User = require('./models/userModel');
// const Investment = require('./models/investmentModel')
// const depsosit = require('./models/depositModel')
const amount = '100.00' * '0.03'
const money = require('money-math');
const interest = '0';
console.log(amount)
console.log(money.add(interest,`${amount}`))
