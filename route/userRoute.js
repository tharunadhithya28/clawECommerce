const express = require('express');
const { registerUser, loginUser, logoutUser,checkUser } = require('../controller/userController');
const router = express.Router();



// In your auth route handler
router.get('/checkuser', checkUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser)

module.exports = router;
