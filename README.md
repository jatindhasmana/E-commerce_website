# E-commerce Product Dashboard

A MERN app where a seller signs up, logs in, and manages their product catalogue: add, list, search, update and delete products. The frontend is React (Vite + Tailwind), and it talks to an Express + MongoDB REST API.

**Live frontend:** https://e-commerce-website-sigma-brown.vercel.app. The API runs locally (see below), so you need to run the backend to use the app.

## Features

- Sign up and log in. Pages are guarded by a `PrivateComponent` route wrapper in React Router, so a visitor who isn't logged in is sent to the sign-up page.
- Add a product: name, price, category and company, tied to the user who added it.
- Product list with delete and update actions.
- Live search across name, company, category and price, using a MongoDB `$regex` + `$or` query.
- UI styled with Tailwind CSS.

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 18, React Router 6, Vite, Tailwind CSS |
| Backend | Node.js, Express 4, CORS |
| Database | MongoDB with Mongoose 8 |

## Project structure

```
backend/
  index.js        Express app and all REST routes
  models/         Mongoose schemas: users, products
  init.js         seeds sample data
frontend/
  src/App.jsx     routes (public: /signup, /login; private: /, /add, /update/:id)
  src/components/ Nav, SignUp, Login, ProductList, AddProduct, UpdateProduct, PrivateComponent
```

## API

| Method | Path | What it does |
|---|---|---|
| POST | `/register` | Create a user (the password is removed from the response) |
| POST | `/login` | Log in with email and password |
| GET | `/products` | List all products |
| POST | `/add-product` | Add a product |
| GET | `/product/:id` | Get one product |
| PUT | `/product/:id` | Update a product |
| DELETE | `/product/:id` | Delete a product |
| GET | `/search/:key` | Search products |

## Run it locally

You need Node.js 18+ and MongoDB running on your machine.

```bash
git clone https://github.com/jatindhasmana/E-commerce_website.git
cd E-commerce_website

# API on http://localhost:3000
cd backend
npm install
node index.js

# in a second terminal: UI on http://localhost:5173
cd frontend
npm install
npm run dev
```

The API connects to `mongodb://127.0.0.1:27017/commerce`.

## What I'd improve next

This was an early project. These are the gaps I know about and how I'd close them:

- **Password security:** passwords are stored and compared as plain text. Next step: hash them with bcrypt on sign-up and compare hashes on login.
- **Real auth on the API:** `jsonwebtoken` is installed but not used yet. Issue a JWT on login, send it in the `Authorization` header, and check it in a middleware so only the owner can update or delete their products.
- **Config:** move the API URL and MongoDB URL into environment variables, so the deployed frontend can reach a deployed backend (for example on Render).
- **Validation and errors:** validate request bodies, return proper HTTP status codes (404, 400), and store price as a number.
