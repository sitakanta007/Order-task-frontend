import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTopButton from "@utils/ScrollToTopButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import Navbar from "@utils/Navbar.jsx";
import NotFound from "@utils/NotFound";
import ProductDetails from "@components/product/ProductDetails";
import Cart from "pages/Cart.jsx";
import { fetchCart } from "@redux/slices/cartSlice";

export default function App() {

  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);

  // Runs:
  // 1. On page load
  // 2. On refresh
  // 3. After login
  useEffect(() => {
    if (auth?.user?.id && auth?.token) {
      dispatch(fetchCart()); // userId & token auto-read inside thunk
    }
  }, [auth?.user?.id, auth?.token]);
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* HOME ROUTE */}
        <Route path="/" element={<Home />} />
        {/* PRODUCT DETAILS ROUTE */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* CART PAGE */}
        <Route path="/cart" element={<Cart />} />

        {/* Dedicated 404 route */}
        <Route path="/not-found" element={<NotFound />} />

        {/* Fallback catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

    { /* Scroll button (always visible on every page) */}
    <ScrollToTopButton />
    </>
  );
}
