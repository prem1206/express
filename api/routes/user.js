const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user');

router.post('/signup', usercontroller.signup_user);
router.post('/login', usercontroller.user_login);
module.exports = router;
