const paymentModel = require("../Models/paymentModel")

const makePayment = async(req, res) => {
    const {amount, currency} = req.body

    try{
        const acc_no = req.user.acc_no
        const payment = await paymentModel.makePayment(acc_no, amount, currency)
        res.status(200).json({payment})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getUserPayments = async(req, res) => {
    try{
        const acc_no = req.user.acc_no
        const lstPayments = await paymentModel.getUserPayments(acc_no)
        res.status(200).json({lstPayments})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
const getUserPayments = async (req, res) => {
    const { acc_no } = req.query;  // Make sure acc_no is extracted from req.query

    if (!acc_no) {
        return res.status(400).json({ error: "Account number is required" });  // Send proper error if acc_no is missing
    }

    try {
        const payments = await paymentModel.getUserPayments(acc_no);
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    makePayment,
    getUserPayments
}