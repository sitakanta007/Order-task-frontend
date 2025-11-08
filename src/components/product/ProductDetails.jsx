import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProducts } from "@redux/slices/productSlice";
import LoadingScreen from "@utils/LoadingScreen";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((s) => s.auth);
  const userLoggedIn = Boolean(user);
  const { allProducts, loading } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginError, setLoginError] = useState("");

  const increaseQty = () => {
    if (!userLoggedIn) {
        setLoginError("Please login to checkout");
        return;
    }

    if (quantity >= 10) {
        setErrorMsg("You can only buy up to 10 items");
        return;
    }

    if (quantity >= product.available_quantity) {
        setErrorMsg("Not enough stock available");
        return;
    }

    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1);
    }
  };

  {/* add to cart button function*/}
  const handleAddToCart = () => {
    if (!userLoggedIn) {
        setLoginError("Please login to checkout");
        return;
    }

    // cart logic later
    console.log("Added to cart!");
    };

  // Load products if user opens product page via direct link
  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, []);

  // clear quantity error after 3 seconds
  useEffect(() => {
    if (errorMsg) {
        const timer = setTimeout(() => setErrorMsg(""), 3000);
        return () => clearTimeout(timer);
    }
    }, [errorMsg]);

    // clear login msg after 3 seconds
    useEffect(() => {
    if (loginError) {
        const timer = setTimeout(() => setLoginError(""), 3000);
        return () => clearTimeout(timer);
    }
    }, [loginError]);

  // Loading UI (dark mode supported)
  if (loading || allProducts.length === 0) {
    return <LoadingScreen message="Loading product…" />;
  }

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="px-6">
      <div
        className="
          max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10
          bg-lightBg dark:bg-darkBg2
          p-8 rounded-2xl shadow-xl
        "
      >
        <div className="rounded-xl overflow-hidden bg-lightCard dark:bg-darkCard shadow-md">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full object-cover max-h-[520px]"
          />
        </div>

        <div className="space-y-8">
            {/* 1. Section: Name + Description */}
            <section
                className="
                p-6 rounded-xl
                bg-white dark:bg-darkBg
                border border-lightBorder dark:border-darkBorder
                shadow-sm
                "
            >
                <h1 className="text-3xl font-bold text-lightPrimary dark:text-darkPrimary mb-4">
                {product.title}
                </h1>

                <p className="text-lightSecondary dark:text-darkSecondary leading-relaxed">
                {product.description}
                </p>
            </section>



            {/* 2. Section: Price + (Stock + Quantity Selector) */}
            <section
                className="
                p-6 rounded-xl
                bg-lightCard dark:bg-darkCard
                border border-lightBorder dark:border-darkBorder
                shadow-sm
                flex items-center justify-between gap-8
                "
            >

                {/* Left side: Price + Stock */}
                <div className="flex flex-col">
                <p className="text-3xl font-bold text-brand-700 dark:text-brand-300">
                    ₹{product.price}
                </p>

                <p className="mt-2 text-sm text-lightSecondary dark:text-darkSecondary">
                    Available Stock: <span className="font-semibold">{product.available_quantity}</span>
                </p>
                </div>


                {/* Right side: Quantity selector */}
                <div className="flex flex-col items-end">
                <p className="font-semibold mb-2 text-lightPrimary dark:text-darkPrimary">
                    Quantity
                </p>

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
                </div>
            </section>

            {/* 3. Section: Add to Cart + Back to Products (50/50 split) */}
            <section
                className="
                p-6 rounded-xl
                bg-lightBg dark:bg-darkBg2
                border border-lightBorder dark:border-darkBorder
                shadow-md
                flex items-center gap-6
                "
            >
                {/* Add to Cart (left half) */}
                <button
                onClick={handleAddToCart}
                className="
                    w-1/2 py-3 text-lg font-semibold rounded-xl
                    bg-brand-600 hover:bg-brand-700
                    dark:bg-brand-500 dark:hover:bg-brand-600
                    text-white shadow-md transition
                "
                >
                Add to Cart
                </button>

                {/* Back button (right half) */}
                <Link
                to="/"
                className="
                    w-1/2 py-3 text-lg font-semibold rounded-xl
                    text-center
                    bg-white dark:bg-darkCard
                    border border-lightBorder dark:border-darkBorder
                    hover:bg-lightCard dark:hover:bg-darkBg transition
                    text-lightPrimary dark:text-darkPrimary
                "
                >
                Back to Products
                </Link>
            </section>
            <div className="min-h-[40px] mt-4 space-y-2">
            {errorMsg && (
                <div className="p-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
                {errorMsg}
                </div>
            )}

            {loginError && (
                <div className="p-3 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                {loginError}
                </div>
            )}
            </div>


            </div>
      </div>
    </div>
  );
}
