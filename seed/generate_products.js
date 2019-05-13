const ObjectId = require("mongodb").ObjectID;

const CATEGORIES = ["laptop", "book", "keyboard", "tablet", "drone"];

const LENGTH_ITEMS_LIST = 100;

//
const ITEMS = (() => {
  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  let items = [];
  for (let i = 0; i < LENGTH_ITEMS_LIST; i++) {
    const randomProduct = getRandomArbitrary(0, CATEGORIES.length);
    const _id = new ObjectId();
    const item = `${CATEGORIES[randomProduct]} ${_id}`;
    const price = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
    const qty = 10; //initialQuantity
    const category = CATEGORIES[randomProduct];

    const itemToPush = {
      _id,
      item,
      price,
      qty,
      category
    };

    items.push(itemToPush);
  }
  console.log(items);
  return items;
})();

module.exports = ITEMS;
