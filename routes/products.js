const express = require("express");
const router = express.Router();

// @route GET /products
// @desc Test route
// @access Public
router.get("/", (req, res) => res.send("Products Routes"));

module.exports = router;
