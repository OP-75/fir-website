const express = require('express')
const {CaseModel,OfficerModel} = require('./mongoose-schema')
const router = express.Router()




router.put("/case/:objId",async (req,res)=>{

    if (req.session.officerId===undefined) {
        res.status(400).json({sucess: false, error: "Please login"})
        return;
    }
    
    // const loggedInOfficerData = await OfficerModel.findById(req.session.user);
    const loggedInOfficerRank = req.session.officerRank
    const loggedInOfficerId = req.session.officerId

    //remember the data we are sending from front end is only assignedOfficer (ie assigned Officer id) & case status
    var data = req.body;

    // console.log(data)

    try {
        const newOfficerData = await OfficerModel.findById(data.assignedOfficer);
        console.log(newOfficerData);

        if(Object.keys(newOfficerData).length === 0){
            res.status(401).json({sucess: false, error: "Officer ID is invalid please recheck it!"})
            return;
        }
        const newOfficerName = newOfficerData.officerName
        
        data = {...data, "assignedOfficerName": newOfficerName}

        const details = new CaseModel(data)
        
    } catch (error) {
        res.status(401).json({sucess: false, error: "Officer ID is invalid please recheck it!"})
        return;
    }
    
    
    
    
    
    try {
        
        const {objId} = req.params
        const prevDoc = await CaseModel.findById(objId)
        // console.log(prevDoc);
        
        // console.log(`${prevDoc.assignedOfficer!==loggedInOfficerId}, ${prevDoc.assignedOfficer!=="None"}, ${prevDoc.assignedOfficer!==""}, ${loggedInOfficerRank}`);
        if (prevDoc.assignedOfficer!==loggedInOfficerId && prevDoc.assignedOfficer!=="None" && prevDoc.assignedOfficer!=="" && loggedInOfficerRank==="Constable") {
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
