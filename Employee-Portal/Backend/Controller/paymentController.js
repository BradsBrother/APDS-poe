const paymentModel = require("../Models/paymentModel")

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
    getUnverifiedTransactions,
    verifyAndSubmitTransactions
}