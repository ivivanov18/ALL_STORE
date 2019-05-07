const mongoose = require("mongoose");
const config = require("../config");
const { mongoURI } = require("../config");

module.exports = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Mongodb connected ...");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
