import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@redux/slices/productSlice";
import Navbar from "@utils/Navbar";
import Filters from "@utils/Filters";
import ProductGrid from "@components/product/ProductGrid";

export default function Home() {
  const dispatch = useDispatch();
  const { filteredProducts, loading } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex gap-6 mt-6 px-6">
        <Filters />
        <div className="flex-1">
          {loading ? <p>Loading...</p> : <ProductGrid products={filteredProducts} />}
        </div>
      </div>
    </>
  );
}