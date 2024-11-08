const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const validator = require("validator")
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    employee_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

    employeeSchema.statics.loginEmployee = async function(employee_id, password) {
        // Validate if fields are actually filled
        if (!employee_id || !password) {
            throw Error('All fields must be filled');
        }
    
        const user = await this.findOne({ employee_id: employee_id });
    
        if (!user) {
            throw Error("Incorrect emplyee Id number");
        }
    
        const match = await bcrypt.compare(password, user.password);
    
        if (!match) {
            throw Error("Incorrect password");
        }
    
        return user; // Return the user object upon successful login
    };
    
    employeeSchema.statics.getEmployeePassword = async function( password){ 
        if(!password){
            throw Error("Pleae enter password")
        }

        // validate password
        if (!validator.isStrongPassword(password)){
            throw Error('Please choose a new password')
        }

        const salt = await bcrypt.genSalt(10) //number specifies complexities - higher number = more complex
        const hash = await bcrypt.hash(password, salt)

        return hash
    }
   
   module.exports = mongoose.model('Employee', employeeSchema)