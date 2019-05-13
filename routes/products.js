const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// @route GET /products
// @desc
// @access Public
router.get("/", async (req, res) => {
  const result = await Product.getProducts();
  if (!result) {
    return res.send("There are no books corresponding to your research");
  }
  res.json({ result });
});

// @route GET /products/by-category
// @desc
// @access Public
router.get("/by-category", async (req, res) => {
  //const category = req.params.byCategory;
  const { category } = req.body;
  const result = await Product.getProductsBy(category);
  if (!result) {
    return res.send("There are no books corresponding to your research");
  }
  res.json({ result });
});

module.exports = router;
