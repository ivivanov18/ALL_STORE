// private variables
let _items = new WeakMap();
let _totalQty = new WeakMap();
let _totalPrice = new WeakMap();

class Cart {
  constructor({ items, totalQty, totalPrice }) {
    _items.set(this, { ...items }, {});
    _totalQty.set(this, totalQty || 0);
    _totalPrice.set(this, totalPrice || 0);
  }

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

    let oldQty = _totalQty.get(this);
    _totalQty.set(this, ++oldQty);

    items[id] = { ...storedItem };
    _items.set(this, items);
  }

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
