# E-Commerce Store

## Overview

The E-Commerce Store is a full-stack web application designed to provide a seamless online shopping experience. Built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, it offers a feature-rich platform for users to browse, search, and purchase products effortlessly. The application is styled with Tailwind CSS for a modern and responsive design. Payments are securely processed using Stripe, and product images are uploaded and managed via Cloudinary.

## Features

-   **User Authentication:** Secure user registration and login with JSON Web Tokens (JWT) for authentication.

-   **Product Catalog:** Display of products with details like name, description, price, category, and images.

-   **Product Search and Filters:** Advanced search functionality with filters for categories, price range, ratings, and more.

-   **Cart and Checkout:** Users can add products to their cart, update quantities, and proceed to checkout for a seamless purchase process.

-   **Payment Integration:** Secure integration with Stripe for handling online payments.

-   **Order Management:** Users can view order history and track order status.

-   **Admin Dashboard:** An administrative interface to manage products, categories, users, and orders.

-   **Responsive Design:** Mobile-friendly and optimized for various screen sizes.

-   **Wishlist:** Allow users to save products for future purchases.

-   **Image Upload and Management:** Product images are uploaded and stored securely using Cloudinary.

-   **Review and Ratings:** Users can review products and provide ratings to help others make informed decisions.

## Tech Stack

**Frontend:** React.js, React Router, Redux (optional for state management), Tailwind CSS

**Backend:** Node.js, Express.js

**Database:** MongoDB (using Mongoose ODM)

**Authentication:** JSON Web Tokens (JWT) for secure authentication

**Payment:** Stripe for payment processing

**Form Handling:** React Hook Form for managing forms

**Image Upload:** Cloudinary for storing and managing product images

**Other Libraries:** Axios (for API requests)

## API Reference

#### User Regiser

```http
  post /api/v1/user/register
```

### User Authentication

#### User Login

```http
  post /api/v1/auth/login
```

#### User Logout

```http
  post /api/v1/auth/logout
```

### Admin Category Routes

#### Add Category

```http
  post /api/v1/admin/category
```

#### Update Category

```http
  put /api/v1/admin/category/:slug
```

#### Delete Category

```http
  delete /api/v1/admin/category/:slug
```

### Admin Product Routes

#### Add Product

```http
  post /api/v1/admin/product
```

#### Update Product

```http
  put /api/v1/admin/product/:slug
```

#### Delete Product

```http
  delete /api/v1/admin/product/:slug
```

### Admin Order Routes

#### Get All Orders

```http
  get /api/v1/admin/order
```

#### Get Total Orders

```http
  get /api/v1/admin/order/total-orders
```

#### Get Total Sales

```http
  get /api/v1/admin/order/total-sales
```

#### Get Total Sales by Dates

```http
  get /api/v1/admin/order/total-sales-by-dates
```

#### Order Delivery

```http
  get /api/v1/admin/order/deliver/:id
```

### Category Routes

#### Get All Categories

```http
  get /api/v1/category
```

#### Get Single Category

```http
  get /api/v1/category/:slug
```

### Product Routes

#### Get All Products

```http
  get /api/v1/product
```

#### Get Top Rated Products

```http
  get /api/v1/product/top-rated
```

#### Get New Products

```http
  get /api/v1/product/new
```

#### Get Single Product

```http
  get /api/v1/product/:slug
```

#### Add Review for Product

```http
  post /api/v1/product/review/:slug
```

### Order Routes

#### Place Order

```http
  post /api/v1/order
```

#### Get All Orders for Single User

```http
  get /api/v1/order
```

#### Get Order by ID

```http
  get /api/v1/order/:id
```

#### Payment Intent

```http
  get /api/v1/order/payment-intent/:id
```

#### Pay for Order

```http
  put /api/v1/order/payment/:id
```

## Environment Variables

To run this project, you will need to add the following environment variables to your server .env file

`SERVER_PORT`

`MONGO_URL`

`JWT_ACESS_KEY`

`CLOUDINARY_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_SECRET_KEY`

`CLOUDINARY_FOLDER`

`STRIPE_SECRET_KEY`

To run this project, you will need to add the following environment variables to your client .env.local file

`VITE_SERVER_URL`

`VITE_HERO_URL`

`VITE_STRIPE_PUB_KEY`

## Run Locally

**Prerequisites :**

-   Node.js (version >= 20.0.0)
-   npm (or yarn)
-   MongoDB Atlas account (for cloud database) or local MongoDB setup
-   Stripe account (for payment integration)
-   Cloudinary account (for image upload)

Clone the project

```bash
  git clone https://github.com/REDOWAN038/e-commerce-store.git
```

### To Run Server

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Server URL (provide port at environment varaible)

```bash
  http://localhost:${port}
```

### To Run Client Frontend

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm run dev
```

Client URL

```bash
  http://localhost:5173
```
