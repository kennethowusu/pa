var express = require('express');
var router = express.Router();
var summaryController  = require('../controllers/summaryController');
const user  = require('../functions/userFunctions');
const account = require("../functions/accountFunctions");
const util = require('util');


const notificationController = require('../controllers/notificationController')




// 
// router.get('/',user.requireAuth,
//           user.isVerified,
//          notificationController.getNotificationIndexPage)
//
// router.get('/:id',
//           user.requireAuth,
//           user.isVerified,
//           notificationController.getSingleNoticationPage)
// // router.post('/change-password',user.requireAuth,settingsController.changePassword)
//
// router.post('/read',
//             user.requireAuth,
//             user.isVerified,
//             notificationController.readNotification)
//
// router.post('/singlenote/read',
//               user.requireAuth,
//               user.isVerified,
//               notificationController.readSingleNote)
module.exports = router;
