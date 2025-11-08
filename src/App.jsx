import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTopButton from "@utils/ScrollToTopButton";
import Home from "./pages/Home.jsx";
import Navbar from "@utils/Navbar.jsx";
import NotFound from "@utils/NotFound";
import ProductDetails from "@components/product/ProductDetails";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* HOME ROUTE */}
        <Route path="/" element={<Home />} />
        {/* PRODUCT DETAILS ROUTE */}
        <Route path="/product/:id" element={<ProductDetails />} />

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
