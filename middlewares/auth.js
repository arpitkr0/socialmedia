const { getUser } = require("../services/auth");

const restrictToLoggedinUserOnly = (req, res, next) => {
  const userUid = req.cookies.uid;
  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);
  if (!user) {
    res.clearCookie("uid");
    return res.redirect("/login");
  }

  req.user = user;
  next();
};

module.exports = {
  restrictToLoggedinUserOnly,
};
