const { getUser } = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
  //   const authenticationHeaderValue = req.headers["authorization"];
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();
  const user = getUser(tokenCookie);
  if (!user) return next();
  req.user = user;
  return next();
};

const restrictTo = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role))
      return res.end("You are not authorized to access this resource");
    return next();
  };
};

module.exports = { checkForAuthentication, restrictTo };
