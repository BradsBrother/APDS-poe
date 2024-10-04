const paymentModel = require("../Models/paymentModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    jwt.sign({_id}, process.env.SECRET_KEY,{expiresIn: "3d"})
}

const makePayment = async(req, res) => {
    const {acc_no, amount, currency} = req.body

    try{
        const payment = await paymentModel.makePayment(acc_no, amount, currency)
        const token = createToken(payment._id)

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3*24*60*60*1000,
            sameSite: "strict",
        })

        res.status(200).json({acc_no, amount, currency})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    makePayment
}