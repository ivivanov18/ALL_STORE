const express = require("express");
const router = express.Router();

// @route GET /users
// @desc Test route
// @access Public
router.get("/", (req, res) => res.send("User Route"));

module.exports = router;
