const express = require('express')
const {CaseModel,OfficerModel} = require('./mongoose-schema')
const router = express.Router()

const {checkSignIn, allowOnlyComissioner} = require("./authenticate"); 


/*

Chrome version 80 or higher will block all third-party cookies by default. If you use the api using HTTPS, switch the protocol to the HTTPS and check whether the Set-Cookie in the response header contains SameSite=None and Secure.

If it doesn't use HTTPS, Chrome 80 will intercept the login function under the http protocol, 
causing the entire local deployment service to be unavailable. 
For this situation, open chrome://flags/#same-site-by-default-cookies and 
chrome://flags/#cookies-without-same-site-must-be-secure in chrome, set it to be Disabled.

*/

router.delete("/case/:objId", [checkSignIn, allowOnlyComissioner],async (req,res)=>{

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


router.delete("/officer/:objId", [checkSignIn, allowOnlyComissioner],async (req,res)=>{

    const {objId} = req.params

    try {
        //see the docs for more details, param is the filter
        const updatation = await CaseModel.updateMany({assignedOfficer: objId}, {assignedOfficer: "None", assignedOfficerName: "None", caseStatus: "Officer yet to be assigned"});
        console.log(`For Deletting officer ${JSON.stringify(updatation)} was returned`);

        const mongooseDoc = await OfficerModel.deleteOne({_id: objId})
        res.status(202).json({sucess: true, result: mongooseDoc})
    } catch (error) {
        console.log(`Error wile saving or creatining the UserDetails object:: ${error}`);
    }
    

})


module.exports = router
