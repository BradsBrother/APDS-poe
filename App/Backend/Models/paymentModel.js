const mongoose = require('mongoose')
const validator = require("validator")
const userSchema = require("../Models/userModel")
const Schema = mongoose.Schema

const paymentSchema = new Schema({
    acc_no: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
        get: v => (v / 100).toFixed(2),
        set: v => Math.round(v * 100)
    },
    currency: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    submittedToSwift: {
        type: Boolean,
        default: false
    }
});

paymentSchema.statics.makePayment = async function(acc_no, amount, currency){
    if (!acc_no || !amount || !currency){
        throw Error('All fields must be filled')
    }
    // Validate currency code
    if (!validator.isISO4217(currency)){
        throw Error("Please enter a valid currency code")
    }
    
    // Verify/authenticate user
    const existingUser = await userSchema.findOne({ acc_no });
    if (!existingUser){
        throw Error('Account number is incorrect or does not exist')
    }

    const payment = await this.create({ acc_no, amount, currency });
    return payment;
}

paymentSchema.statics.getUserPayments = async function(acc_no) {
    // Check if account number is provided
    if (!acc_no) {
        throw Error("Account number is required");
    }

    // Validate if the user with the given account number exists
    const existingUser = await userSchema.findOne({ acc_no });
    if (!existingUser) {
        throw Error("Account number is incorrect or does not exist");
    }

    // Fetch the list of payments associated with the account number
    const lstPayments = await this.find({ acc_no });

    // Return the payments, even if the list is empty (handle gracefully)
    return lstPayments.length > 0 ? lstPayments : [];
};

paymentSchema.statics.getUnverifiedTransactions = async function() {
    return await this.find({ isVerified: false });
};

paymentSchema.statics.verifyAndSubmitTransactions = async function(transactionIds) {
    return await this.updateMany(
        { _id: { $in: transactionIds } },
        { $set: { isVerified: true, submittedToSwift: true } }
    );
};

paymentSchema.statics.verifyTransaction = async function(transactionId) {
    try {
        // Check if the transaction exists
        const transaction = await this.findById(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        // Update the transaction
        const updatedTransaction = await this.findByIdAndUpdate(
            transactionId,
            { $set: { isVerified: true, submittedToSwift: true } },
            { new: true } // Return the updated document
        );

        return updatedTransaction;
    } catch (error) {
        console.error("Error in verifyTransaction:", error); // Log detailed error
        throw error; // Rethrow to propagate the error to the response
    }
};


module.exports = mongoose.model('Payment', paymentSchema);
