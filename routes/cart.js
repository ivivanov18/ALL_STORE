const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.get("/", (req, res) => {
  res.send("CART ROUTE");
});

router.get("/add-to-cart/:id", (req, res) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  // TODO: check product exists by id and then add
  cart.add({ item: "laptop", price: 10 }, productId);
  cart.displayCart();
  req.session.cart = { ...cart };
  console.log("req.session.cart", req.session.cart);
  return res.send({ cart: req.session.cart });
});

module.exports = router;
