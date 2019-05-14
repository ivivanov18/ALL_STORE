# ALL-STORE

## PROJECT

Express.js backend for a online shop. The user can:

- register
- login
- browse all available products and by category
- add items to carts
- get the cart
- make payments (charges)

## TECHNICAL DESCRIPTION

The application uses:

- Express.js
- MongoDB
- Stripe to make payments

### Routes

- auth: existing endpoint
  - GET auth/ : login to the application
- users: exising endpoints
  - GET /users/
- cart: existing endpoints
  - GET cart/add-to-cart/:id
  - GET cart/get-cart
- products: exisisting endpoints
  - GET /products
  - GET /products/by-category

### Models

- Cart
- User
- Product
- Order

## How to run the project

### Pre-requesites

- The app works with MongoDB so the user must have installed MongoDB.
- The app uses stripe to make payments for the purchase, the user must therefore have a stripe api account and a stripe-test key. The test key must be used in the file `cart.js` by replacing `process.env.STRIPE_TEST_KEY`.

### How to run

- Clone the repo `git clone https://github.com/ivivanov18/ALL_STORE`
- Install all the dependencies `npm install`
- Run the command `npm run start`

### How to seed the DB

The DB must be seeded (with products) by uncommenting the following lines in the file `index.js`:

```
const ITEMS = require("./seed/generate_products");
const seedProductsDB = require("./seed/products_seed");
seedProductsDB();
```

## TODO

- Add protected routes for add-to-cart, get-cart and charge endpoints
- Refactor code to eliminate node.js "deprecated" error
- Refactor code to eliminate
