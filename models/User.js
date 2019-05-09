const ObjectId = require("mongodb").ObjectID;

const connection = require("../db/connection");
const userCollectionName = "users";

let _name = new WeakMap();
let _email = new WeakMap();
let _password = new WeakMap();
let _id = new WeakMap();

class User {
  constructor(payload) {
    _name.set(this, payload.name);
    _email.set(this, payload.email);
    _password.set(this, payload.password); //TODO: set it to hash
    _id.set(this, new ObjectId());
  }

  toMongoBinding() {
    return {
      _id: _id.get(this),
      name: _name.get(this),
      email: _email.get(this),
      password: _password.get(this)
    };
  }

  static async findById(id) {
    const collection = getConnection();
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result ? new User(result) : undefined;
  }

  static async findOne({ email }) {
    const collection = await getConnection();
    const user = await collection.findOne({ email });
    return user;
  }

  async save() {
    const collection = await getConnection();
    console.log(this.toMongoBinding());
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

const getConnection = async () => {
  const conn = await connection();
  return await conn.db().collection(userCollectionName);
};

module.exports = User;
