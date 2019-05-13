/**
 * @access private
 */
let _items = new WeakMap();
let _totalQty = new WeakMap();
let _totalPrice = new WeakMap();

class Cart {
  /**
   * @constructor
   * @param {Object} items - the items contained in the cart
   * @param {number} totalQty - the total quantity of the items in the cart
   * @param {number} totalPrice - the total price of the items in the cart
   */
  constructor({ items, totalQty, totalPrice }) {
    _items.set(this, { ...items }, {});
    _totalQty.set(this, totalQty || 0);
    _totalPrice.set(this, totalPrice || 0);
  }

  /**
   * Function to display the items, total quantity and price of the cart
   */
  displayCart() {
    console.log("items: ", _items.get(this));
    console.log("totalQty: ", _totalQty.get(this));
    console.log("totalPrice: ", _totalPrice.get(this));
  }

  /**
   * Function that adds an element to the cart
   * @param {Object} item - the item to be added to the cart {item: "laptop", price: 100}
   * @param {number} id - the id of the item to be added
   */
  add(item, id) {
    const items = _items.get(this);
    let storedItem = items[id]; // 2 , price 4

    if (!storedItem) {
      // does not exist
      storedItem = items[id] = { item: item.item, qty: 0, price: 0 };
    }

    storedItem.qty++;
    storedItem.price = item.price * storedItem.qty;
    _totalPrice.set(this, _totalPrice.get(this) + item.price);

    // update total quantity of cart
    let oldQty = _totalQty.get(this);
    _totalQty.set(this, ++oldQty);

    items[id] = { ...storedItem };
    _items.set(this, { ...items });
  }

  /**
   * Function that returns an object mapping of the cart
   * @returns {Object} object - representing the cart
   */
  toObjectMapping() {
    return {
      items: _items.get(this),
      totalQty: _totalQty.get(this),
      totalPrice: _totalPrice.get(this)
    };
  }

  /**
   * Function that generates array of the items contained in the cart
   * @returns {Object[]} items - contained in the cart
   */
  generateArray() {
    const arr = [];
    const items = _items.get(this);
    for (const id in items) {
      arr.push(items[id]);
    }
    return arr;
  }

  get items() {
    return _items.get(this);
  }

  get totalPrice() {
    return _totalPrice.get(this);
  }

  get totalQty() {
    return _totalQty.get(this);
  }
}

module.exports = Cart;
