# ALL-STORE

## PROJECT

Express.js backend for a online shop.

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

## TODO

- Add Stripe
- Refactor code to eliminate node.js "deprecated" error
