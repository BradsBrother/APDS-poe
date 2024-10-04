const express = require("express")
const router = express.Router()
const {loginUser, signupUser, logoutUser} = require("../Controllers/userController")

router.post("/login", loginUser)

router.post("/signup", signupUser)

router.post("/logout", logoutUser)

module.exports = router