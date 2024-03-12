require("dotenv").config();
const jwt = require("jsonwebtoken");

const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const getUser = (token) => {
  if (!token) return null;
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  setUser,
  getUser,
};
