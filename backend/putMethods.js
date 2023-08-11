const express = require('express')
const {CaseModel,OfficerModel} = require('./mongoose-schema')
const router = express.Router()




router.put("/case/:objId",async (req,res)=>{
    const data = req.body;

    const {objId} = req.params

    console.log(data);
    
    const details = new CaseModel(data)
    console.log(details);
    try {
        //see the docs for more
        const mongooseDoc = await CaseModel.findByIdAndUpdate(objId, data)
        res.status(202).json({sucess: true, data: mongooseDoc})
    } catch (error) {
        console.log(`Error wile saving or creatining the UserDetails object:: ${error}`);
    }
    

})



module.exports = router
