const express = require('express');
const User = require('../Models/userModel');
const signupUser = require('../Models/userModel');


const router = express.Router()


router.post('/login', async (req, res) => {
    const { name, acc_no, password } = req.body;

    try {
        // Log incoming request
        console.log("Incoming Login Request:", req.body);

        const user = await User.loginUser(name, acc_no, password);
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(400).json({ error: error.message });
    }
});



router.post("/signup", signupUser)

// router.post("/logout", logoutUser)

module.exports = router;