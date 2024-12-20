const express = require('express');
const requireAuth = require("../Middleware/requireAuth")
const { loginUser, signupUser, logoutUser } = require('../Controllers/userController');
const bruteforce = require('../Middleware/bruteforce');

const router = express.Router()

router.post("/login", bruteforce.prevent, loginUser)

router.post("/signup", signupUser)

router.post("/logout", requireAuth, logoutUser)

router.get("/auth-status", requireAuth, (req, res) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
})

module.exports = router;