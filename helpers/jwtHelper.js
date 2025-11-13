const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const generateRefreshToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
