import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTopButton from "@utils/ScrollToTopButton";
import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* HOME ROUTE */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>

    { /* Scroll button (always visible on every page) */}
    <ScrollToTopButton />
    </>
  );
}
