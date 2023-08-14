const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const { CaseModel, OfficerModel } = require("./mongoose-schema");

const postMethods = require("./postMethods");
const putMethods = require("./putMethods");
const deleteMethods = require("./deleteMethods");
const getMethods = require("./getMethods");
const loginLogoutMethods = require("./login-logout");

const session = require("express-session");

const app = express();

app.use(cors({
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}));
app.use(express.json());

app.use(
  session({
    secret: "This secret key is used to very and sign session IDs I think",
    resave: true,
    saveUninitialized: true,
  })
);

const dbURI =
  "mongodb+srv://user-69:sjhnryHwxbXhj4Xv@cluster0.vnp5reu.mongodb.net/FIR?retryWrites=true&w=majority";

async function connectToDb() {
  try {
    const result = await mongoose.connect(dbURI);
    console.log("Connected to atlas sucessfully");

    //dont start server unless connected to cloud db
    app.listen(5000, () => console.log(`server started`));
  } catch (error) {
    console.log(error);
  }
}

connectToDb();

app.use("/", postMethods);

app.use("/", putMethods);

app.use("/", deleteMethods);

app.use("/", getMethods);

app.use("/", loginLogoutMethods);




app.get('/',(req,res)=>{
  res.status(200).send(`welcome to home page ${req.session.user}`)
})
