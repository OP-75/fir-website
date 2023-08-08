const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    'userName': {
        type: String,
        required: true,
    },
    'userAge': {
        type: String,
        required: true,
    }, 
    'userGender': {
        type: String,
        required: true,
    }, 
    'userEmail': {
        type: String,
        required: true,
    }, 
    'userNumber': {
        type: String,
        required: true,
    }, 
    'userAddress': {
        type: String,
        required: true,
    }, 
}, {timestamps: true})

//name is important, it will automatically puralize this (ie convert it to blogs) and look for that collection in that db
const UserDetails = mongoose.model("UserDetail",userDetailsSchema,"UserDetails")

module.exports = UserDetails