const jwt = require("jsonwebtoken");
require("dotenv").config();

const AdminAuthenticator = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.json("Please Login First");
    return;
  }
  jwt.verify(token, process.env.key, (err, decoded) => {
    if (decoded) {
      console.log(decoded);
      if (decoded.user.role == "Admin") {
        next();
      } else {
        res.json({
          Message: "You are not authorised, Only admin can perfom this action",
          Authorization: false,
        });
      }
    } else {
      res.json({ err });
    }
  });
};
module.exports = { AdminAuthenticator };
