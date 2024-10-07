const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const validator = require("validator")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id_no: {
        type: String,
        required: true,
        unique: true
    },
    acc_no: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

    userSchema.statics.signupUser = async function(name, id_no, acc_no, password){
        if (!acc_no || !password || !name || !id_no){
            throw Error('All fields must be filled')
        }
            //validate id number
            if(!validator.isLuhnNumber(id_no)){
                throw Error("Please enter a valid South African ID number")
            }
        
            // validate password
            if (!validator.isStrongPassword(password)){
                throw Error('Please choose a new password')
            }
            
            //verify/authenticate user
            const existingUser = await this.findOne({id_no})
            if (existingUser){
                throw Error('ID number already in use')
            }
        
            const salt = await bcrypt.genSalt(10) //number specifies complexities - higher number = more complex
            const hash = await bcrypt.hash(password, salt)
            const user = await this.create({name, id_no, acc_no, password: hash})
            return user
    }

    userSchema.statics.loginUser = async function(name, acc_no, password){
        // validate if fields are actually filled
        if (!name || !acc_no || !password){
            throw Error('All fields must be filled')
        }
        
        const user = await this.findOne({acc_no: acc_no})
    
        if(!user){
            throw Error("Incorrect account number")
        }
        
        const match = await bcrypt.compare(password, user.password)
    
        if(!match){
            throw Error("Incorrect password")
        }
    
        return user
    }
   
   module.exports = mongoose.model('User', userSchema)
