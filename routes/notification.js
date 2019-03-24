var express = require('express');
var router = express.Router();
var summaryController  = require('../controllers/summaryController');
const user  = require('../functions/userFunctions');
const account = require("../functions/accountFunctions");
const util = require('util');


const notificationController = require('../controllers/notificationController')





router.get('/',user.requireAuth,notificationController.getNotificationIndexPage)

router.get('/:id',user.requireAuth,notificationController.getSingleNoticationPage)
// router.post('/change-password',user.requireAuth,settingsController.changePassword)

router.post('/read',user.requireAuth,notificationController.readNotification)

router.post('/singlenote/read',user.requireAuth,notificationController.readSingleNote)
module.exports = router;
