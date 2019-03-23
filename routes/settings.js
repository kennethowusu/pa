var express = require('express');
var router = express.Router();
var summaryController  = require('../controllers/summaryController');
const user  = require('../functions/userFunctions');
const account = require("../functions/accountFunctions");
const util = require('util');


const settingsController = require('../controllers/settingsController')





router.get('/',user.requireAuth,settingsController.getSettingsIndexPage)


router.post('/change-password',user.requireAuth,settingsController.changePassword)

module.exports = router;
