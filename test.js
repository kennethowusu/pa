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


const last_credited = new Date('2019-01-15');
const next_two_weeks = moment(last_credited).add('2','weeks');
console.log(next_two_weeks)
