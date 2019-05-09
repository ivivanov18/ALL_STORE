const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const User = require("../models/User");

// @route GET /auth
// @desc Test route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, ["password"]); //req.user set by middleware
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

module.exports = router;
