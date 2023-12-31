const express = require('express')
const {CaseModel,OfficerModel} = require('./mongoose-schema')

const {checkSignIn, allowOnlyComissioner} = require("./authenticate"); 

const router = express.Router()


router.post("/case",async (req,res)=>{
    const data = req.body;
    // console.log(data);
    
    const caseDocument = new CaseModel(data)
    // console.log(caseDocument);
    try {
        const mongooseDoc = await caseDocument.save()
        res.status(201).json({sucess: true, result: mongooseDoc})
    } catch (error) {
        console.log(`Error wile saving or creatining the UserDetails object:: ${error}`);
        //status 403 = invalid input
        res.status(403).json({sucess: false, error: error, msg: "Invalid input"})
    }
    

})


router.post("/officer", [checkSignIn, allowOnlyComissioner], async (req,res)=>{
    var data = req.body
    console.log(data);

    // actually we should not be able to register 2 officers with SAME email!!! But i havent implemented that validation/feature yet!!!!
    data = {...data, officerEmail: data.officerEmail.toLowerCase()};

    const alreadyExists = await OfficerModel.findOne({officerEmail: data.officerEmail})
    if (alreadyExists) {
        return res.status(401).json({sucess: false, msg: "Officer with same email already exists"})
    }

    const officerDocument = OfficerModel(data)

    try {
        const result = await officerDocument.save();
        return res.status(201).json({sucess: true, result: result})
    } catch (error) {
        console.log(error);
        return res.status(403).json({sucess: false, error: error, msg: "Invalid input"})
    }


})



module.exports = router

