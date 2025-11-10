# Ecommerce Frontend (React + Redux Toolkit)

This is the frontend for the Ecommerce app built with React, Vite, Redux Toolkit, and TailwindCSS.
It handles product browsing, cart, checkout, coupon application, and order viewing.

The app communicates with the Node API service and Django Admin backend.

## Requirements

- Node.js 18 or newer
- npm or yarn
- A running backend API (Node Express + Prisma)
- A running Django Admin (for product/customer management)
- API Base URL configured in .env

## Getting Started
1. Install Dependencies
```npm install```

2. Set Environment Variables. Create a .env file at the project root:
```VITE_API_URL=http://YOUR-NODE-API-IP:3000/api```

3. Start Dev Server
```npm run dev```

   App will run and show the localhost url and port in the terminal.

4. Build for Production
```npm run build```

   Vite outputs optimized files to: ```/dist```

## Host production on S3:

- Upload the entire ```/dist``` folder to your S3 bucket
- Enable "Static Website Hosting"
- Make the bucket public or use CloudFront
- Set index: index.html
- Set error: index.html (for SPA routing)

## Project Structure
```bash
src/
 ├─ api/
 │   ├─ axiosClient.js
 │   ├─ cartApi.js
 │   ├─ productApi.js
 │   ├─ orderApi.js
 │   └─ couponApi.js
 │
 ├─ components/
 │   ├─ Navbar.jsx
 │   ├─ Footer.jsx
 │   ├─ Coupons.jsx
 │   ├─ LoadingOverlay.jsx
 │   └─ common UI components
 │
 ├─ pages/
 │   ├─ Home.jsx
 │   ├─ ProductDetails.jsx
 │   ├─ Cart.jsx
 │   ├─ Orders.jsx
 │   ├─ Login.jsx
 │   └─ Signup.jsx
 │
 ├─ redux/
 │   ├─ store.js
 │   ├─ slices/
 │   │    ├─ authSlice.js
 │   │    ├─ cartSlice.js
 │   │    └─ orderSlice.js
 │
 ├─ hooks/
 │   └─ useAuth.js
 │
 ├─ utils/
 │   ├─ formatPrice.js
 │   └─ tokenHelpers.js
 │
 ├─ App.jsx
 ├─ main.jsx
 └─ index.css
```

## API Integration Overview

All API calls use Axios via axiosClient.js.
```
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
```
Each feature has a dedicated API file:
```
productApi.js
cartApi.js
orderApi.js
couponApi.js
```

## Cart System

- Cart is fully managed in Redux Toolkit:
- Add, remove, increment, decrement
- Sync with backend on update or checkout
- Calculates: subtotal, discount, GST, final total

## Checkout sends:
```
{
  "user_id": "USER123",
  "items": [
    { "product_id": "...", "quantity": 2, "price": 499 }
  ],
  "subtotal": 998,
  "discount": 0,
  "tax": 49.9,
  "total_amount": 1047.9,
  "coupon": "SAVE10"
}
```

##Coupons

User sees all available coupons filtered by:
- Their current order count
- Whether the coupon is already used
- Whether nth-value matches next order

## Other features
- Data is stored in Redux.
- Loading overlay spinner
- Search and filter for products
- Lazy loading of product images
- Scroll to top button
- Dark and light theme
- Login Modal window.
- My orders and cart section after login
- Product quantity validation, Max 10 allowed at a time.
- Cart functionality
- Increase , decrease quantity of products, then update cart
- Removing product from cart,
- Check for available coupons
- Apply coupon and recalculate price.
- Checkout and place order in a single button - because there is not payment gateway
- My orders section showing all orders - recent first.

## Future Improvements
- Pagination for orders
- Wishlist support
