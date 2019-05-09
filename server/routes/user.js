const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get('/', user.getAllUser);
router.post('/signup', user.registerUser);
router.post('/login', user.loginUser);
router.post('/forgot-password', user.forgotPassword);
module.exports = router;