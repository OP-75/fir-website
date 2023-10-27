// https://shadowsmith.com/thoughts/how-to-deploy-an-express-api-to-vercel#_4-add-verceljson-configuration

require("dotenv").config() //for enviroment variables
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
// const path = require('path')

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
  origin: process.env.SOURCE_URL,
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}));

app.use(express.json());

app.use(cookieParser());

// console.log(path.join(__dirname, "..", "build")); // ".." goes 1 level up/ 1 lvl back
// app.use(express.static(path.join(__dirname, "..", "build"))) //serves the build up react app on the same url/domain as server without cors


app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: process.env.SAME_SITE,
      secure: process.env.SECURE==="true"? true:false, //for vercel deployment 
    }
  })
);

const dbURI = process.env.MONGOOSE_DB_URL;

async function connectToDb() {
  try {
    const result = await mongoose.connect(dbURI);
    console.log("Connected to atlas sucessfully");

    //dont start server unless connected to cloud db
    app.listen(process.env.PORT || 5000, () => console.log(`server started`));
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

//IMP!!! to work with vercel u have to export the express app!!!!
module.exports = app;


