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
    }
})

    paymentSchema.statics.makePayment = async function(acc_no, amount, currency){
        if (!acc_no || !amount || !currency){
            throw Error('All fields must be filled')
        }
            //validate id number
            if(!validator.isISO4217(currency)){
                throw Error("Please enter a valid currency code")
            }
            
            //verify/authenticate user
            const existingUser = await userSchema.findOne({acc_no})
            if (!existingUser){
                throw Error('Account number is incorrect or does not exist')
            }
        
            const payment = await this.create({acc_no, amount, currency})
            return payment
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
    

module.exports = mongoose.model('Payment', paymentSchema)