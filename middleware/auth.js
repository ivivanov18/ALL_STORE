const jwt = require("jsonwebtoken");
const { secret } = require("../config");

/**
 * Middleware that adds the user in the req after checking the token set in the
 * header
 */
module.exports = (req, res, next) => {
  // get the token from header
  const token = req.header("x-auth-token");

  // check if exists
  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
