const express = require('express');
const User = require('../Models/userModel');
const { loginUser, signupUser, logoutUser } = require('../Controllers/userController');


const router = express.Router()

router.post("/login", loginUser)

router.post("/signup", signupUser)

router.post("/logout", logoutUser)

module.exports = router;