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

## TODO

- Add protected routes for add-to-cart, get-cart and charge endpoints
- Refactor code to eliminate node.js "deprecated" error
- Refactor code to eliminate
