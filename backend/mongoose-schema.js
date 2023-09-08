const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    'userName': {
        type: String,
        required: true,
        validate: (value)=> value!=='',
    },
    'userAge': {
        type: String,
        required: true,
        validate: (value)=> value!=='',
    }, 
    'userEmail': {
        type: String,
        required: true,
        validate: (value)=> value!=='',
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
    'victimRelation':{
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
        validate: (value)=> value!=='',
    },    
    'crimeAddress':{
        type: String,
        required: true,
        validate: (value)=> value!=='',
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
    


    //assignedOfficer stored the id of the offier that is assigned
    'assignedOfficer':{
        type: String,
        required: false,
        default: "None",
    },
    'assignedOfficerName':{
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
        validate: (value)=> value!=='',
    },

    'officerRank': {
        type: String,
        required: true,
        validate: (value)=> value!=='',
    }, 
    
    'officerEmail': {
        type: String,
        required: true,
        validate: (value)=> value!=='',
    }, 

    "officerDesignatedArea":{
        type: String,
        required: true,
        validate: (value)=> value!=='',
    },

    "officerPassword":{
        type: String,
        required: false,
        default: "password",
    }
     
})


//name is important, it will automatically puralize this (ie convert it to blogs) and look for that collection in that db
const OfficerModel = mongoose.model("officerDetail",officerDetailsSchema,"officerDetails")

module.exports = {CaseModel, OfficerModel,}