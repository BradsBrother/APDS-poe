const userModel = require("../Models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: "3d"});
}

const loginUser = async(req, res) =>{
    const {name, acc_no, password} = req.body

    try{
        const user = await userModel.loginUser(name, acc_no, password)
        const token = createToken(user._id)

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3*24*60*60*1000,
            sameSite: "strict",
        })

        res.status(200).json({name, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}

const signupUser = async(req, res) => {
    const {name, id_no, acc_no, password} = req.body

    try{
        const user = await userModel.signupUser(name, id_no, acc_no, password)
        const token = createToken(user._id)

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3*24*60*60*1000,
            sameSite: "strict",
        })

        res.status(200).json({name, id_no, acc_no, password})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const logoutUser = async (res, req) => {
    res.cookie("token", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        //sameSite: "strict",
    })

    res.status(200).json({message: "Logged out successfully"})
}

module.exports = {
    loginUser,
    signupUser,
    logoutUser
}