const express = require("express");
const session = require("express-session");

const ITEMS = require("./seed/generate_products");

const seedProductsDB = require("./seed/products_seed");
seedProductsDB();

const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "secretforsession",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    cookie: { secure: false }
  })
);
app.use(express.json({ extended: false }));
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/cart", require("./routes/cart"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
