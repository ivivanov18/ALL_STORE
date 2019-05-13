const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/**
 * @description route to get all products
 * @route GET /products/
 * @access public
 * @returns
 */
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

/**
 * @description route to get products by category
 * @route GET /products/by-category
 * @access public
 * @returns {object} result - of the research
 */
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
