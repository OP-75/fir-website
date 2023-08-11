const express = require('express')
const {CaseModel,OfficerModel} = require('./mongoose-schema')

const router = express.Router()




//get all data
router.get("/case",async (req,res)=>{              
    const result = await CaseModel.find()
    res.status(200).json({sucess: true, result})
})

router.get("/case/:caseId", async (req,res)=>{
    
    const caseId = req.params.caseId
    
    try {
        const result = await CaseModel.findById(caseId)
        res.status(200).json({sucess: true, result})
    } catch (error) {
        res.status(400).json({sucess: true, error: error})
    }
    
})



//get case assigned to a officer
router.get("/case-of-officer/:officerId",async (req,res)=>{   
    
    const {officerId} = req.params
    
    const result = await CaseModel.find()
    res.status(200).json({sucess: true, result})
})




// make a get fucntion for lower level officers that takes their UID and fetches the officers 
// assigned location and then using that location as a filter shows the officer all the cases in their
// assigned location

//also make a similar one where officer can fetch the cases they are assigned to



module.exports = router
