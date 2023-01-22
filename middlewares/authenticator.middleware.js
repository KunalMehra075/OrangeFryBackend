const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.key, (err, decoded) => {
      if (decoded) {
        next();
      } else {
        res.json({ Message: "Please Login First" });
      }
    });
  } else {
    res.json({ Message: "Please Login First" });
  }
};
module.exports = { authenticator };
