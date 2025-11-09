import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeItem,
  syncCart,
  selectCartItems,
  selectCartSubtotal,
  selectCartCount
} from "@redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const count = useSelector(selectCartCount);
  const auth = useSelector((s) => s.auth);

  useEffect(() => {
    if (!auth?.user?.id) navigate("/login");
  }, [auth?.user]);

  const handleUpdateCart = async () => {
    await dispatch(syncCart());
  };

  const handleCheckout = async () => {
    await dispatch(syncCart());
    navigate("/checkout");
  };

  if (!items || items.length === 0) {
    return (
      <div className="p-10 text-center text-xl text-lightPrimary dark:text-darkPrimary">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-6xl mx-auto bg-lightBg dark:bg-darkBg2 p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-lightPrimary dark:text-darkPrimary">
          Your Cart ({count} items)
        </h1>

        <div className="space-y-6">

          {items.map((item) => {
            const totalPrice = Number(item.price) * Number(item.quantity);

            return (
              <div
                key={item.product_id}
                className="flex items-center justify-between bg-white dark:bg-darkCard border border-lightBorder dark:border-darkBorder p-5 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.image || item.image_url}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover bg-lightBg dark:bg-darkBg2"
                  />

                  <div>
                    <h2 className="text-lg font-semibold text-lightPrimary dark:text-darkPrimary">
                      {item.title}
                    </h2>
                    <p className="text-sm text-lightSecondary dark:text-darkSecondary">
                      ₹{Number(item.price).toFixed(2)} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => dispatch(decrementQty(item.product_id))}
                      className="w-8 h-8 flex items-center justify-center text-xl bg-lightBg dark:bg-darkBg2 border border-lightBorder dark:border-darkBorder rounded-lg hover:bg-lightCard dark:hover:bg-darkCard transition"
                    >
                      –
                    </button>

                    <span classname="text-xl font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(incrementQty(item.product_id))}
                      className="w-8 h-8 flex items-center justify-center text-xl bg-lightBg dark:bg-darkBg2 border border-lightBorder dark:border-darkBorder rounded-lg hover:bg-lightCard dark:hover:bg-darkCard transition"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-lg font-semibold text-lightPrimary dark:text-darkPrimary">
                    ₹{totalPrice.toFixed(2)}
                  </p>

                  <button
                    onClick={() => dispatch(removeItem(item.product_id))}
                    className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

        </div>

        <div className="mt-10 bg-white dark:bg-darkCard border border-lightBorder dark:border-darkBorder p-6 rounded-lg shadow-md">

          <div className="flex justify-between mb-4">
            <p className="text-lg text-lightPrimary dark:text-darkPrimary">
              Subtotal
            </p>
            <p className="text-lg font-semibold text-lightPrimary dark:text-darkPrimary">
              ₹{subtotal.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between items-center mt-6 gap-4">

            <button
              onClick={handleUpdateCart}
              className="flex-1 py-3 text-lg font-semibold rounded-xl bg-lightBg dark:bg-darkBg2 border border-lightBorder dark:border-darkBorder text-lightPrimary dark:text-darkPrimary hover:bg-lightCard dark:hover:bg-darkCard transition"
            >
              Update Cart
            </button>

            <button
              onClick={handleCheckout}
              className="flex-1 py-3 text-lg font-semibold rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition shadow"
            >
              Checkout
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
