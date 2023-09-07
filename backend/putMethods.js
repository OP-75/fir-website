const express = require('express')
const {CaseModel,OfficerModel} = require('./mongoose-schema')
const router = express.Router()




router.put("/case/:objId",async (req,res)=>{

    if (req.session.user===undefined) {
        res.status(400).json({sucess: false, error: "Please login"})
        return;
    }
    
    const loggedInOfficerData = OfficerModel.findById(req.session.user);
    const loggedInOfficerRank = loggedInOfficerData.officerRank

    //remember the data we are sending from front end is only assignedOfficer (ie assigned Officer id) & case status
    var data = req.body;

    const newOfficerData = await OfficerModel.findById(data.assignedOfficer);
    const newOfficerName = newOfficerData.officerName

    data = {...data, "assignedOfficerName": newOfficerName}

    const {objId} = req.params

    console.log(data);
    
    const details = new CaseModel(data)
    console.log(details);
    try {
        
        const prevDoc = await CaseModel.findById(objId)

        if (prevDoc.assignedOfficer!==req.session.user && prevDoc.assignedOfficer!=="None" && prevDoc.assignedOfficer!=="" && loggedInOfficerRank==="Constable") {
            res.status(401).json({sucess: false, error: "Only Commisner or the Assigned Constable can update the details"})
            return;
        }

        const mongooseDoc = await CaseModel.findByIdAndUpdate(objId, data)
        res.status(202).json({sucess: true, data: mongooseDoc})
    } catch (error) {
        res.status(400).json({sucess: false, error: error})
        console.log(`Error wile saving or creatining the UserDetails object:: ${error}`);
    }
    

})



module.exports = router
