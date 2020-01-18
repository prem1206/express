const express = require('express');
const router = express.Router();
const notificationcontroller = require('../controllers/notification');

router.get('/:receiverID', notificationcontroller.get_notification);
router.post('/', notificationcontroller.send_notification);
module.exports = router;