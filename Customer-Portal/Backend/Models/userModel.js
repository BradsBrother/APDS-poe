const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id_no: {
        type: String,
        required: true
    },
    acc_no: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

   })
   
   module.exports = mongoose.model('User', userSchema)
