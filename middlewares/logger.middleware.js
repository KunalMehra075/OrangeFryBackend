const fs = require("fs");
const logger = (req, res, next) => {
  let log = `Mehtod: ${req.method} Route: ${req.url} User-Agent: ${req.headers["user-agent"]}\n`;
  fs.appendFile("./logs.txt", log, "utf-8");
  next();
};
module.exports = { logger };
