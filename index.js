const express = require("express");

// Models
const User = require("./models/User");

const app = express();
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("BACKEND"));

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
