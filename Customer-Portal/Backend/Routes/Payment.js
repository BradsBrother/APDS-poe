const express = require("express");
const router = express.Router();
const { makePayment, getUserPayments } = require("../Controllers/paymentController");

// Correct route definitions
router.post("/Pay", makePayment);
router.get("/getUserPayments", getUserPayments); // Ensure this matches the frontend request

module.exports = router;
