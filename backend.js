const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')
const {CaseModel,OfficerModel} = require('./mongoose-schema')

const app = express()

app.use(cors());
app.use(express.json())


const dbURI =
  "mongodb+srv://user-69:sjhnryHwxbXhj4Xv@cluster0.vnp5reu.mongodb.net/FIR?retryWrites=true&w=majority";

async function connectToDb() {
    try {
        const result = await mongoose.connect(dbURI);
        console.log("Connected to atlas sucessfully")

        //dont start server unless connected to cloud db
        app.listen(5000,()=>console.log(`server started`))
    } catch (error) {
        console.log(error);
    }
}

connectToDb()




app.post("/register",async (req,res)=>{
    const data = req.body;

    console.log(data);
    
    const details = new CaseModel(data)
    console.log(details);
    try {
        const mongooseDoc = await details.save()
        res.status(201).json({sucess: true, data: mongooseDoc})
    } catch (error) {
        console.log(`Error wile saving or creatining the UserDetails object:: ${error}`);
    }
    

})
app.put("/register/:objId",async (req,res)=>{
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
app.delete("/register/:objId",async (req,res)=>{

    const {objId} = req.params

    try {
        //see the docs for more details, param is the filter
        const mongooseDoc = await CaseModel.deleteOne({_id: objId})
        res.status(202).json({sucess: true, data: mongooseDoc})
    } catch (error) {
        console.log(`Error wile saving or creatining the UserDetails object:: ${error}`);
    }
    

})



//get all data
app.get("/register",async (req,res)=>{              
    const result = await CaseModel.find()
    res.status(200).json({sucess: true, result})
})

app.get("/register/:officerId",async (req,res)=>{   
    
    const {officerId} = req.params
    
    const result = await CaseModel.find()
    res.status(200).json({sucess: true, result})
})




// make a get fucntion for lower level officers that takes their UID and fetches the officers 
// assigned location and then using that location as a filter shows the officer all the cases in their
// assigned location

//also make a similar one where officer can fetch the cases they are assigned to

