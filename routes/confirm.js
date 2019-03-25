var express = require('express');
var router = express.Router();
var summaryController  = require('../controllers/summaryController');
const user  = require('../functions/userFunctions');
const account = require("../functions/accountFunctions");
const util = require('util');


const confirmController = require('../controllers/confirmController')






router.get('/',user.requireAuth,

         confirmController.getConfirmationPage)

router.get('/verification/:token',user.requireAuth,
        confirmController.verifyEmail)

router.post('/send-confirmation-link',user.requireAuth,
        confirmController.resendConfirmationLink)


module.exports = router;
