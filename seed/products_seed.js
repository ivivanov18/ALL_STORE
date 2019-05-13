const connection = require("../db/connection");
const ITEMS = require("./generate_products");

const getConnection = async () => {
  const conn = await connection();
  return await conn.db().collection("products");
};

const seedProductsDB = async () => {
  const collection = await getConnection();
  await collection.insertMany(ITEMS);
};
module.exports = seedProductsDB;
