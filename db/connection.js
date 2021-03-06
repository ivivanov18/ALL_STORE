const MongoClient = require("mongodb").MongoClient;
let _connectionDB;
const url = "mongodb://localhost:27017/all-store";

module.exports = async () => {
  if (!_connectionDB) {
    try {
      _connectionDB = await MongoClient.connect(url, {
        useNewUrlParser: true
        //useCreateIndex: true
      });
    } catch (err) {
      console.err(err);
    }
  }

  return _connectionDB;
};
