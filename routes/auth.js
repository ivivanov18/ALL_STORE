const express = require("express");
const router = express.Router();

// @route GET /auth
// @desc Test route
// @access Public
router.get("/", (req, res) => res.send("Auth Route"));

module.exports = router;
