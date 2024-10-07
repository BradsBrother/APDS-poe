const express = require("express")
const router = express.Router()
const {makePayment, getUserPayments, } = require("../Controllers/paymentController")
const requireAuth = require("../Middleware/requireAuth")

router.post("/Pay", requireAuth, makePayment)

router.get("/Payments", requireAuth, getUserPayments)

module.exports = router