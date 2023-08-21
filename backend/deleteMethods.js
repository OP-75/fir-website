const express = require('express')
const {CaseModel,OfficerModel} = require('./mongoose-schema')
const router = express.Router()




router.delete("/case/:objId",async (req,res)=>{

    const {objId} = req.params

    console.log(`deleteion requested`);

    try {
        //see the docs for more details, param is the filter
        const mongooseDoc = await CaseModel.deleteOne({_id: objId})
        res.status(202).json({sucess: true, result: mongooseDoc})
    } catch (error) {
        console.log(`Error wile saving or creatining the UserDetails object:: ${error}`);
    }
    

})


router.delete("/officer/:objId",async (req,res)=>{

    const {objId} = req.params

    try {
        //see the docs for more details, param is the filter
        const mongooseDoc = await OfficerModel.deleteOne({_id: objId})
        res.status(202).json({sucess: true, result: mongooseDoc})
    } catch (error) {
        console.log(`Error wile saving or creatining the UserDetails object:: ${error}`);
    }
    

})


module.exports = router
