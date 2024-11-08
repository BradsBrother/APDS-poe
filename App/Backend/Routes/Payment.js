const express = require("express")
const router = express.Router()
const {
    makePayment,
    getUserPayments,
    getUnverifiedTransactions,
    verifyAndSubmitTransactions
} = require("../Controllers/paymentController");
const requireAuth = require("../Middleware/requireAuth")

router.post("/Pay", requireAuth, makePayment);
router.get("/Payments", requireAuth, getUserPayments);
router.get("/UnverifiedPayments", requireAuth, getUnverifiedTransactions);
router.post("/VerifySubmit", requireAuth, verifyAndSubmitTransactions);



module.exports = router;
