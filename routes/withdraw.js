var accountController = require('../controllers/accountController');
var express = require('express');
var router = express.Router();


//==========functions==================//
const user = require('../functions/userFunctions');
const account = require('../functions/accountFunctions')





//==========================GET ROUTES=====================================//
const withdrawController  = require('../controllers/withdrawController')









//========================POST ROUTES======================================//
router.post('/request',user.requireAuth,withdrawController.postWithDrawalRequest)




//==========================PUT ROUTES====================================//

module.exports = router;
