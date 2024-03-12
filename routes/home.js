const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const userinfo = req.user;
  return res.render("home", {
    name: userinfo.name,
  });
});

module.exports = router;
