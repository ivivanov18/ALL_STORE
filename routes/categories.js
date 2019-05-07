const express = require("express");
const router = express.Router();

// @route GET /categories
// @desc Test route
// @access Public
router.get("/", (req, res) => res.send("Categories Routes"));

module.exports = router;
