const express = require("express");
const { CaseModel, OfficerModel } = require("./mongoose-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require('./jwtSecretKey'); //i have made this

const router = express.Router();

// IMP "user"/res.session.user can only be a police officer, civilians not allowed to create accounts/login

async function authenticate(req, res, next) {
  const data = req.body;
  const { email, password } = data;

  try {
    //remember find() returns an array while findOne returns a {obj/map}
    const result = await OfficerModel.findOne({
      officerEmail: email,
      officerPassword: password,
    });
    // console.log(result);
    if (result) {
      // console.log(result._id);
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

router.all("/login", async (req, res, next) => {
  
  console.log("Login process began at backend");
  const result = await authenticate(req, res, next);
  if (result) {
    // regenerate the session, which is good practice to help
    // guard against forms of session fixation(this is a type of attack)
    req.session.regenerate(function (err) {
      if (err) next(err);

      // store user information in session, typically a user id
      req.session.officerId = result._id; //this stored the id of officer
      req.session.officerName = result.officerName; //this stored the Name of officer
      req.session.officerRank = result.officerRank; //this stored the Name of officer

      const jwtToken = jwt.sign(
        {
          id: result._id,
          officerName: result.officerName,
          officerRank: result.officerRank,
          officerDesignatedArea: result.officerDesignatedArea,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );



      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err);

        console.log(
          `User with session id: ${req.session.id} has logged in as ${req.session.officerName}`
        );
        res.cookie("jwtToken",jwtToken,{
            httpOnly: true,
            // secure: true, //for HTTPS
            // signed: true
          })

        res.status(202).json({
          loggedIn: true
        })
      });
    });
  } else {
    return res
      .status(200)
      .json({ loggedIn: false, msg: "Wrong username or password" });
  }
});

router.all("/logout", (req, res, next) => {

  // jwt-redis you need use jwt-redis library to destroy/blacklist token on server side

  // logout logic
  console.log("Logout process began at backend for session id", req.session.id);

  // // clear the user from the session object and save.
  // // this will ensure that re-using the old session id
  // // does not have a logged in user
  req.session.officerId = null;
  req.session.save((err) => {
    if (err) {
      next(err);
      console.error(err);
    }

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        console.warn(err);
      }

      res.cookie("jwtToken",null,{
        httpOnly: true,
        // secure: true, //for HTTPS
        // signed: true
      })

      console.log("Logout process completed at backend  at backend");

      return res
        .status(200)
        .json({
          success: true,
          auth: null,
          newSessionId: req?.session?.user,
          user: req?.session?.user,
        });
    });
  });
});

module.exports = router;
