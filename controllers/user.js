const USER = require("../models/user");
const { setUser } = require("../services/auth");

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await USER.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Email or Password!",
    });

  const token = setUser(user);
  res.cookie("uid", token, { maxAge: 900000, httpOnly: true });
  return res.redirect("/home");
};

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await USER.create({
      name,
      email,
      password,
    });

    return res.redirect("/login");
  } catch (error) {
    return res.render("signup", {
      error: "Email already registered, try logging in",
    });
  }
};

module.exports = {
  handleUserLogin,
  handleUserSignup,
};
