import { useEffect, useState } from "react";
import productApi from "@api/productApi";
import Navbar from "@utils/Navbar";
import Filters from "@utils/Filters";
import ProductGrid from "@components/product/ProductGrid";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    productApi.getAll().then((res) => {
      setProducts(res.data.data);
      setSorted(res.data.data);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex gap-6 mt-6 px-6">
        <Filters products={products} />
        <div className="flex-1">
          <ProductGrid products={sorted} />
        </div>
      </div>
    </>
  );
}