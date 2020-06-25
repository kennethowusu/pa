const express = require('express');
const router = express.Router();




const user  = require('../functions/userFunctions');





//===mocdels===============//
const Notification = require('../models/notification');
const NotificationObject = require('../models/notificationObject');
const NotificationChange = require('../models/notificationChange');

//========controllers======//
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
