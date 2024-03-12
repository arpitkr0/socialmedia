const express = require("express");
const router = express.Router();

const { handleUserLogin, handleUserSignup } = require("../controllers/user");

router.get("/", (req, res) => {
  return res.redirect("/home");
});
router.get("/login", (req, res) => {
  if (req.cookies.uid) res.clearCookie("uid");
  return res.render("login");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.post("/login", handleUserLogin);
router.post("/signup", handleUserSignup);

module.exports = router;
