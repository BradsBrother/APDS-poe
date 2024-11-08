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
    
   
   module.exports = mongoose.model('Employee', employeeSchema)