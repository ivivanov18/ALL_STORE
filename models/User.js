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

    console.log(_name.get(this));
  }

  toMongoBinding() {
    return {
      _id: _id.get(this),
      _name: _name.get(this),
      _email: _email.get(this),
      _password: _password.get(this)
    };
  }

  static async findById(id) {
    const collection = getConnection();
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result ? new User(result) : undefined;
  }

  async insertInDB() {
    const collection = await getConnection();
    console.log(collection);
    collection
      .insert(this.toMongoBinding())
      .then(result => console.log("result:", result));
  }
}

const getConnection = async () => {
  const conn = await connection();
  return await conn.db().collection(userCollectionName);
};

module.exports = User;
