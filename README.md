# Simply-hiring

## Description

This is a RESTful API service for managing a simple e-commerce system developed in Node.js with TypeScript, structured using the principles of Clean Architecture. It manages products and orders with JWT-based authentication.


## Environment Setup
To run this project, make sure you have the following installed on your system.

Binaries      | Version
------------- | -------------
NodeJS        |  ^20.0
NPM           | ^10.0
PostgreSQL    | ^14.0


## Instaletion

Run following command for installing all the dependencies locally.

```bash
$ npm install
```

## Running the app on local environment
```bash
$ npm run start:dev
```

## Environment Variables
Put all the environment variables inside `.env` file located ats the root of the project. The list of all the environment variables is available in `.env.example` file. 



## Database Migrations
To deploy migratoin to database use the following command:

```
npm run migrate:run 
```

## API Endpoints
The following endpoints are supported:


Authentication
- POST /auth/signup: Register a new user
- POST /auth/signin: Login an existing user

Products
- GET /products: List all products with pagination
- POST /products: Create a new product (Authenticated users only)
- GET /products/:id: Get a single product by ID
- PUT /products/:id: Update a product by ID (Authenticated users only)
- DELETE /products/:id: Delete a product by ID (Authenticated users only)
Orders
- POST /orders: Create a new order (Authenticated users only)
- GET /orders: List all orders for an authenticated customer
- GET /orders/:id: Get order details by ID

## Testing
Postman url I send via mail
- http://localhost:3000/api-docs (but only added /login for demonstration)
