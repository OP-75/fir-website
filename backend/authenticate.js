
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./jwtSecretKey"); //i have made this

function checkSignIn(req, res, next) {
    try {
    //   console.log(`User with JWT: ${req.cookies.jwtToken} has requested /cases`);
      const token = req.cookies.jwtToken;
      if (!token) {
        return res
          .status(401)
          .json({ success: false, msg: "Please login" });
      }
  
      const user = jwt.verify(token, SECRET_KEY);
      req.user = user;
      next();
    } catch (error) {
      res.clearCookie("jwtToken");
      return res.status(401).json({ success: false, error: error });
    }
  }


function allowOnlyComissioner(req, res, next) {
    try {
    //   console.log(`User with JWT: ${req.cookies.jwtToken} has requested /cases`);
        const officer = req.user;
      if (!officer || officer.officerRank!=='Commisioner') {
        return res
          .status(401)
          .json({ success: false, msg: "Unauthorized access, only 'Commisioner' allowed" });
      }

      next();
    } catch (error) {
      res.clearCookie("jwtToken");
      return res.status(401).json({ success: false, error: error });
    }
  }



  module.exports = {checkSignIn, allowOnlyComissioner}
  