const ObjectId = require("mongodb").ObjectID;
const ORDERS_COLLECTION_NAME = "orders";
const connection = require("../db/connection");

const _user = new WeakMap();
const _cart = new WeakMap();
const _paymentId = new WeakMap();
const _id = new WeakMap();

class Order {
  constructor({ user, cart, paymentId }) {
    _user.set(this, user);
    _cart.set(this, cart);
    _paymentId.set(this, paymentId);
    _id.set(this, new ObjectId());
  }

  toMongoBinding() {
    return {
      _id: _id.get(this),
      cart: _cart.get(this),
      paymentId: _paymentId.get(this),
      userId: _user.get(this).id,
      createdAt: Date.now()
    };
  }

  async save() {
    const collection = await getConnection(ORDERS_COLLECTION_NAME);
    const result = await collection.insertOne(this.toMongoBinding());
    return result;
  }
}

const getConnection = async collectionName => {
  const conn = await connection();
  return await conn.db().collection(collectionName);
};

module.exports = Order;
