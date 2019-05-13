const ObjectId = require("mongodb").ObjectID;

const connection = require("../db/connection");
const PRODUCTS_COLLECTION = "products";

class Product {
  /**
   * Function to get all products from db
   * @returns {Object[]} products
   */
  static async getProducts() {
    const collection = await getConnection(PRODUCTS_COLLECTION);
    const results = await collection.find({}).toArray();
    return results;
  }

  /**
   * Function to get all products for given category
   * @param {string} category - the category to
   * @returns {Object[]} products
   */
  static async getProductsBy(category) {
    const collection = await getConnection(PRODUCTS_COLLECTION);
    const results = await collection.find({ category }).toArray();
    return results;
  }

  /**
   * Function to get product in db corresponding to given id
   * @param {string} id - the id of the product to look for
   * @returns {Object[]} products
   */
  static async findById(id) {
    const collection = await getConnection(PRODUCTS_COLLECTION);
    const product = await collection.findOne({ _id: new ObjectId(id) });
    return product;
  }
}

const getConnection = async collectionName => {
  const conn = await connection();
  return await conn.db().collection(collectionName);
};

module.exports = Product;
