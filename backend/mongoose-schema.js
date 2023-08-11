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
    
    

    'victimName':{
        type: String,
        required: false,
    },
    'victimAge':{
        type: String,
        required: false,
    },
    'victimGender':{
        type: String,
        required: false,
    },
    'victimNumber':{
        type: String,
        required: false,
    },
    'victimAddress':{
        type: String,
        required: false,
    },


    'crimeType':{
        type: String,
        required: true,

        validate: (value)=> value!==''
    },    
    'crimeDateTime':{
        type: String,
        required: true,
    },    
    'crimeAddress':{
        type: String,
        required: true,
    },    
    'crimeArea':{
        type: String,
        required: true,

        validate: (value)=> value!=='',
    },    
    'witnesses':{
        type: String,
        required: false,
    },
    


    //assigned officer will be chnged to their id later
    'assignedOfficer':{
        type: String,
        required: false,
        default: "None",
    },
    'caseStatus':{
        type: String,
        required: false,
        default: "Officer yet to be assigned",
    },
}, {timestamps: true})

//name is important, it will automatically puralize this (ie convert it to blogs) and look for that collection in that db
const CaseModel = mongoose.model("UserDetail",userDetailsSchema,"UserDetails")





const officerDetailsSchema = new Schema({
    'officerName': {
        type: String,
        required: true,
    },

    'officerRank': {
        type: String,
        required: true,
    }, 
    
    'officerEmail': {
        type: String,
        required: true,
    }, 

    "officerDesignatedArea":{
        type: String,
        required: true,
    }
     
})


//name is important, it will automatically puralize this (ie convert it to blogs) and look for that collection in that db
const OfficerModel = mongoose.model("officerDetail",officerDetailsSchema,"officerDetails")

module.exports = {CaseModel, OfficerModel,}