import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProducts } from "@redux/slices/productSlice";
import LoadingScreen from "@utils/LoadingScreen";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { allProducts, loading } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (quantity < product.available_quantity) {
        setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1);
    }
  };

  // Load products if user opens product page via direct link
  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, []);

  // Loading UI (dark mode supported)
  if (loading || allProducts.length === 0) {
    return <LoadingScreen message="Loading product…" />;
  }

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="px-6 py-6">
      <div
        className="
          max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10
          bg-lightCard dark:bg-darkCard
          border border-lightBorder dark:border-darkBorder
          shadow-[0_4px_16px_rgba(0,0,0,0.08)]
          dark:shadow-[0_6px_20px_rgba(0,0,0,0.35)]
          rounded-2xl p-8
        "
      >
        {/* Image Section */}
        <div className="
            w-[300px]
            h-[450px]
            mx-auto
            overflow-hidden
            rounded-xl
            bg-lightBg dark:bg-darkBg2
            flex items-center justify-center
        ">
            <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
            />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-between">

          <Link
            to="/"
            className="
                inline-block
                text-brand-600 hover:text-brand-700
                dark:text-brand-400 dark:hover:text-brand-300
                font-medium
            "
            >
            ← Back to Products
          </Link>

          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-lightPrimary dark:text-darkPrimary mb-4">
              {product.title}
            </h1>

            <p className="text-lightSecondary dark:text-darkSecondary leading-relaxed mb-6">
              {product.description}
            </p>

            <p className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-4">
              ₹{product.price}
            </p>

            <p className="text-sm text-lightSecondary dark:text-darkSecondary mb-8">
              Available Stock: <span className="font-semibold">{product.available_quantity}</span>
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={decreaseQty}
                className="
                  w-10 h-10 flex items-center justify-center text-xl
                  bg-lightBg dark:bg-darkBg2
                  border border-lightBorder dark:border-darkBorder
                  rounded-lg hover:bg-lightCard dark:hover:bg-darkCard transition
                "
              >
                –
              </button>

              <span className="text-xl font-semibold">{quantity}</span>

              <button
                onClick={increaseQty}
                className="
                  w-10 h-10 flex items-center justify-center text-xl
                  bg-lightBg dark:bg-darkBg2
                  border border-lightBorder dark:border-darkBorder
                  rounded-lg hover:bg-lightCard dark:hover:bg-darkCard transition
                "
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              className="
                w-full py-3 text-lg font-semibold rounded-xl
                bg-brand-500 hover:bg-brand-600 text-white
                dark:bg-brand-600 dark:hover:bg-brand-700
                shadow-subtle transition
              "
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
