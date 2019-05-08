const express = require("express");

// Models
const User = require("./models/User");
// const user1 = new User({
//   name: "Ivan",
//   email: "ivan@test.fr",
//   password: "123456"
// });
// console.log(user1);
// try {
//   user1.insertInDB();
// } catch (err) {
//   console.log(err);
// }

const app = express();
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("BACKEND"));

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
