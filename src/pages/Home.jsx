import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@redux/slices/productSlice";
import Filters from "@utils/Filters";
import ProductGrid from "@components/product/ProductGrid";
import LoadingOverlay from "@utils/LoadingOverlay";

export default function Home() {
  const dispatch = useDispatch();
  const { filteredProducts, loading } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  if (loading) {
    return <LoadingOverlay text="Loading products…" />;
  }

  return (
      <div className="flex gap-6 mt-6 px-6">
        <Filters />
        <div className="flex-1">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
  );
}