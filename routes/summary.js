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





router.get('/',
       user.requireAuth,
       user.isVerified,
       summaryController.getSummaryIndexPage)

module.exports = router;
