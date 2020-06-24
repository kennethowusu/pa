var express = require('express');
var router = express.Router();


//==========functions==================//
const user = require('../functions/userFunctions');





//==========================GET ROUTES=====================================//
const withdrawController  = require('../controllers/withdrawController')









//========================POST ROUTES======================================//
router.post('/request',user.requireAuth,withdrawController.postWithDrawalRequest)




//==========================PUT ROUTES====================================//

module.exports = router;
