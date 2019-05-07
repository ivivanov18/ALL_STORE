const express = require("express");
const Category = require("./models/Category");
const connectToDB = require("./db/db");
connectToDB();

const app = express();

app.get("/", (req, res) => res.send("BACKEND"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
