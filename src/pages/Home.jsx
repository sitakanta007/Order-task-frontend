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

  const handleSort = (type) => {
    let sortedList = [...products];

    if (type === "price_low") sortedList.sort((a, b) => a.price - b.price);
    if (type === "price_high") sortedList.sort((a, b) => b.price - a.price);
    if (type === "latest") sortedList = [...products];

    setSorted(sortedList);
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen">
        <Filters onSortChange={handleSort} />

        <div className="flex-1 bg-darkBg">
          <ProductGrid products={sorted} />
        </div>
      </div>
    </>
  );
}
