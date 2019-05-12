const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.get("/", (req, res) => {
  res.send("CART ROUTE");
});

// TODO: make routes protected
router.get("/add-to-cart/:id", (req, res) => {
  const productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  // TODO: check product exists by id and then add
  cart.add({ item: "laptop", price: 10 }, productId);
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
