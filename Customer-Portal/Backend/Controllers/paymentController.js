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
const getUnverifiedTransactions = async (req, res) => {
    try {
        const unverifiedPayments = await paymentModel.getUnverifiedTransactions();
        res.status(200).json(unverifiedPayments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const verifyAndSubmitTransactions = async (req, res) => {
    const { transactionIds } = req.body;

    try {
        await paymentModel.verifyAndSubmitTransactions(transactionIds);
        res.status(200).json({ message: "Transactions verified and submitted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    makePayment,
    getUserPayments,
    getUnverifiedTransactions,
    verifyAndSubmitTransactions
}