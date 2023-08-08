const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')
const {userDetails} = require('./mongoose-schema')
const UserDetails = require('./mongoose-schema')

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

    try {
        const details = new UserDetails({data})
        const mongooseDoc = await details.save()
        res.status(201).json({sucess: true, data: mongooseDoc})
    } catch (error) {
        console.log(`Error wile saving or creatining the UserDetails object:: ${error}`);
    }
    

})


app.get("/register",(req,res)=>{

    res.status(200).json({sucess: true})
})

