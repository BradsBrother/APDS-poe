const express = require('express');
const requireAuth = require("../Middleware/requireAuth")
const { loginEmployee, logoutEmployee } = require('../Controllers/employeeController');

const router = express.Router()

router.post("/login", loginEmployee)

router.post("/logout", requireAuth, logoutEmployee)

router.get("/auth-status", requireAuth, (req, res) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
})

module.exports = router;