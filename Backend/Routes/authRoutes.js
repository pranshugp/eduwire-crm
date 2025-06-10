const express = require('express');
const router = express.Router();
const { register, login,verifyOTP,forgotPassword,resetpassword ,resendOTP} = require('../Controllers/authControllers');

router.post('/register', register);
router.post('/login', login);
router.post("/verify-otp", verifyOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetpassword);
router.post("/resend-otp", resendOTP);


module.exports = router;
