var accountController = require('../controllers/accountController');
var express = require('express');
var router = express.Router();


//==========functions==================//
const user = require('../functions/userFunctions');
const account = require('../functions/accountFunctions')





//==========================GET ROUTES=====================================//
const withdrawController  = require('../controllers/withdrawController')






router.get('/',user.requireAuth,
             user.isVerified,
             withdrawController.getWithdrawPage)

             router.get('/withdrawal-history',user.requireAuth,
                          user.isVerified,
                          withdrawController.getWithdrawHistoryPage)





//========================POST ROUTES======================================//
router.post('/request',user.requireAuth,withdrawController.postWithDrawalRequest)




//==========================PUT ROUTES====================================//

module.exports = router;
