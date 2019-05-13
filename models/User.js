const ObjectId = require("mongodb").ObjectID;

const connection = require("../db/connection");
const USERS_COLLECTION = "users";

/**
 * @access private
 */
let _name = new WeakMap();
let _email = new WeakMap();
let _password = new WeakMap();
let _id = new WeakMap();

class User {
  /**
   * @constructor
   * @param {string} name - of the user
   * @param {string} email - of the user
   * @param {string} password - of the user
   */
  constructor({ name, email, password }) {
    _name.set(this, name);
    _email.set(this, email);
    _password.set(this, password);
    _id.set(this, new ObjectId());
  }

  /**
   *
   */
  toMongoBinding() {
    return {
      _id: _id.get(this),
      name: _name.get(this),
      email: _email.get(this),
      password: _password.get(this),
      createdAt: Date.now()
    };
  }

  static async findById(id, filterFieldsArray = []) {
    const filteredFieldsObj = filterFieldsArray.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {});
    const collection = await getConnection(USERS_COLLECTION);
    const user = await collection.findOne(
      { _id: new ObjectId(id) },
      { fields: { ...filteredFieldsObj } }
    );
    //return result ? new User(result) : undefined;
    return user;
  }

  static async findOne({ email }) {
    const collection = await getConnection(USERS_COLLECTION);
    const user = await collection.findOne({ email });
    return user;
  }

  /**
   * function to save the user in the db
   * @returns {object} result - of the insertion operation
   */
  async save() {
    const collection = await getConnection(USERS_COLLECTION);
    const result = await collection.insertOne(this.toMongoBinding());

    return result;
  }

  set password(value) {
    _password.set(this, value);
  }

  get password() {
    return _password.get(this);
  }

  get id() {
    return _id.get(this);
  }
}

const getConnection = async collectionName => {
  const conn = await connection();
  return await conn.db().collection(collectionName);
};

module.exports = User;
