const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const User = require("../models/User");
const { secret } = require("../config");

/**
 * @description route to get the user information from the token (token has _id)
 * @route POST /auth
 * @access public
 * @returns {string} token - to be user for other protected routes
 *
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, ["password"]); //req.user set by middleware
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error during authentication");
  }
});

/**
 * @description route to login
 * @route POST /auth
 * @access public
 * @returns {string} token - to be user for other protected routes
 */
router.post(
  "/",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const resultCompareHashPass = await bcrypt.compare(
        password,
        user.password
      );
      if (!resultCompareHashPass) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user._id
        }
      };

      jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        return res.json({ token });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("server error during login");
    }
  }
);

module.exports = router;
