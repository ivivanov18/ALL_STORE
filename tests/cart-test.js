const chai = require("chai");
const expect = chai.expect;

const Cart = require("../models/Cart");

const oldCart = {
  items: {
    "1": {
      item: "book",
      qty: 1,
      price: 10
    },
    "2": {
      item: "laptop",
      qty: 2,
      price: 8
    }
  },
  totalPrice: 18,
  totalQty: 3
};

function initCart(oldCart = {}) {
  return new Cart(oldCart);
}

describe("Cart Creation", () => {
  let cart = {};

  afterEach(() => {
    cart = {};
  });

  it("creates empty when cart passed is empty object", () => {
    cart = initCart();
    expect(cart.totalPrice).to.equal(0);
    expect(cart.totalQty).to.equal(0);
    expect(cart.items).to.eql({});
  });

  it("create cart with data", () => {
    cart = initCart(oldCart);
    expect(cart.totalPrice).to.equal(18);
    expect(cart.totalQty).to.equal(3);
    expect(Object.keys(cart.items)).to.have.length(2);
  });
});

describe("Adding items to cart", () => {
  let cart = {};
  beforeEach(() => {
    cart = initCart(oldCart);
  });

  afterEach(() => {
    cart = {};
  });

  it("add correctly item already present: increase quantity of item and adapt total price and quantity", () => {
    cart.add({ item: "laptop", price: 4 }, 2);
    expect(cart.totalQty).to.equal(4);
    expect(cart.totalPrice).to.equal(22);
  });

  it("add correctly item not yet present in cart", () => {
    cart.add({ item: "mobile", price: 24 }, 3);
    expect(cart.totalQty).to.equal(4);
    expect(cart.totalPrice).to.equal(42);
  });
});

describe("Generate array", () => {
  let cart;
  beforeEach(() => {
    cart = initCart(oldCart);
  });

  afterEach(() => {
    cart = {};
  });

  it("can generate array after adding existing object", () => {
    cart.add({ item: "laptop", price: 4 }, 2);
    const arr = cart.generateArray();
    expect(arr).to.have.length(2);
  });

  it("can generate array after adding new object", () => {
    cart.add({ item: "mobile", price: 24 }, 3);
    const arr = cart.generateArray();
    expect(arr).to.have.length(3);
  });
});
