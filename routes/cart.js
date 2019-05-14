const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

const auth = require("../middleware/auth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

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

router.post("/charge", async (req, res) => {
  const cart = new Cart(req.session.cart);
  const amount = parseFloat(cart.totalPrice).toFixed(2) * 100;
  const { number, exp_month, exp_year, cvc, currency, description } = req.body;

  const token = await stripe.tokens.create({
    card: {
      number,
      exp_month,
      exp_year,
      cvc
    }
  });
  if (!token) {
    return res.status(400).json({ error: "Invalid input provided" });
  }

  const charge = await stripe.charges.create({
    amount,
    currency,
    source: token.id, // obtained with Stripe.js
    description
  });

  if (!charge) {
    return res.status(400).json({ error: "Error during payment" });
  }

  //const { user } = req.user;
  const user = { user: "ivan", id: "test" };
  const paymentId = charge.id;

  const order = new Order({
    cart: { ...cart.toObjectMapping() },
    user,
    paymentId
  });
  const result = await order.save();

  if (!result) {
    return res.status(500).json({ error: "Error DB" });
  }
  return res.send({ charge });
});
module.exports = router;
