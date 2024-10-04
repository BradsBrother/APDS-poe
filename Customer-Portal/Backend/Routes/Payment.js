const express = require("express")
const router = express.Router()
const {makePayment} = require("../Controllers/paymentController")

router.post("/Pay", makePayment)

module.exports = router