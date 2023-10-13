const express = require("express");
const { CaseModel, OfficerModel } = require("./mongoose-schema");

const {checkSignIn} = require("./authenticate"); 


const router = express.Router();

//get all data according to officers rank, ie if constable -> return cases in their are, if commissioner -> return all cases


router.get("/cases", checkSignIn, async (req, res, next) => {
  try {
    const officerDoc = req.user;

    console.log(`/cases GET - ${req.user}`);

    if (officerDoc.officerRank === "Commisioner") {
      const result = await CaseModel.find();
      res
        .status(200)
        .json({
          sucess: true,
          result,
          sessionId: req.session.id,
          user: req.user,
        });
    } else if (officerDoc.officerRank === "Constable") {
      const result = await CaseModel.find({
        crimeArea: officerDoc.officerDesignatedArea,
      });
      res
        .status(200)
        .json({
          sucess: true,
          result,
          sessionId: req.session.id,
          user: req.session.officerId,
        });
    } else {
      res
        .status(401)
        .json({
          sucess: false,
          msg: "request unsucessful, rank is unrecognized",
        });
    }
  } catch (error) {
    res
      .status(404)
      .json({ sucess: false, error: error, msg: "request unsucessful" });
  }
});

router.get("/case/:caseId", async (req, res) => {
  const caseId = req.params.caseId;

  try {
    const result = await CaseModel.findById(caseId);
    res.status(200).json({ sucess: true, result });
  } catch (error) {
    res.status(400).json({ sucess: true, error: error });
  }
});

//below are all the get method for officer and realated ops

//get all cases assigned to a officer
router.get("/case-of-officer/:officerId", checkSignIn, async (req, res) => {
  const { officerId } = req.params;

  try {
    const cases = await CaseModel.find({ assignedOfficer: officerId });
    res.status(200).json({ success: true, result: cases });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
});

router.get("/all-officers", checkSignIn, async (req, res) => {
  //make this so that only commissioner can request this method!!!!
  const result = await OfficerModel.find();
  res.status(200).json({ sucess: true, result: result });
});

router.get("/officer/:officerId", checkSignIn, async (req, res) => {
  //make this so that only commissioner can request this method!!!!
  try {
    const { officerId } = req.params;
    const result = await OfficerModel.findById(officerId);
    res.status(200).json({ sucess: true, result: result });
  } catch (error) {
    console.error(error);
    res.status(401).json({ sucess: true, error: error });
  }
});

router.get("/get-current-officer-id", async (req, res) => {
  try {
    if (req.session.officerId !== undefined) {
      res.status(200).json({ sucess: true, result: req.session.officerId });
    } else {
      res.status(401).json({ sucess: false, error: "Please login" });
    }
  } catch (error) {
    res.status(400).json({ sucess: false, error: error });
  }
});

// make a get fucntion for lower level officers that takes their UID and fetches the officers
// assigned location and then using that location as a filter shows the officer all the cases in their
// assigned location

//also make a similar one where officer can fetch the cases they are assigned to

module.exports = router;
