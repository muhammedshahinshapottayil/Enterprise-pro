const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "zdfds12d5", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
