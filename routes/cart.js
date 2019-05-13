const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// TODO: make routes protected
router.get("/add-to-cart/:id", async (req, res) => {
  const productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  const productInDB = await Product.findById(productId);
  if (productInDB === null) {
    return res.status(404).json({ error: "product not found" });
  }

  cart.add({ item: productInDB.item, price: productInDB.price }, productId);
  cart.displayCart();
  req.session.cart = cart.toObjectMapping();
  res.json({ ...cart.toObjectMapping() });
});

router.get("/get-cart", (req, res) => {
  if (!req.session.cart) {
    return res.json({ items: {}, totalQty: 0, totalPrice: 0 });
  }
  const cart = new Cart(req.session.cart);
  return res.json({ ...cart.toObjectMapping() });
});

module.exports = router;
