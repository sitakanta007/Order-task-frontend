import { useState , useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeItem,
  syncCart,
  selectCartItems,
  selectCartSubtotal,
  selectCartCount,
  clearCart
} from "@redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Coupons from "@components/Coupons";
import cartApi from "@api/cartApi";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const count = useSelector(selectCartCount);
  const auth = useSelector((s) => s.auth);

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    if (!auth?.user?.id) navigate("/login");
  }, [auth?.user, navigate]);

  const handleUpdateCart = async () => {
    await dispatch(syncCart());
  };

  const handleCheckout = async () => {
    try {
      await dispatch(syncCart());

      const payload = {
        user_id: auth?.user?.id,

        items: items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          price: Number(i.price)
        })),

        subtotal: Number(subtotal || 0),
        discount: Number(discountAmount || 0),
        tax: Number(gstAmount || 0),
        total_amount: Number(finalTotal || 0),

        coupon: appliedCoupon?.code || null
      };

      const response = await cartApi.checkout(payload, auth.token);

      if (!response?.data) {
        alert("Checkout failed");
        return;
      }

      dispatch(clearCart());
      alert("Order placed successfully");
      navigate("/orders");

    } catch (err) {
      alert("Checkout failed");
    }
  };

  const handleRemove = async (product_id) => {
    dispatch(removeItem(product_id));

    setTimeout(async () => {
      const updated = JSON.parse(JSON.stringify(items));
      const remaining = updated.filter((i) => i.product_id !== product_id);
      if (remaining.length === 0) {
        await dispatch(syncCart());
      }
    }, 0);
  };

  const handleDecrement = (product_id, currentQty) => {
    if (currentQty <= 1) return;
    dispatch(decrementQty(product_id));
  };

  // ===== Correct discount calculation =====
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const percent = Number(appliedCoupon.discount_percent || 0);
    const amount = (Number(subtotal || 0) * percent) / 100;
    return Number(amount.toFixed(2));
  }, [subtotal, appliedCoupon]);

  // ===== Taxable amount after discount =====
  const taxableAmount = useMemo(() => {
    return Number((Number(subtotal || 0) - discountAmount).toFixed(2));
  }, [subtotal, discountAmount]);

  // ===== GST is now based on taxable amount =====
  const gstAmount = useMemo(() => {
    return Number((taxableAmount * 0.05).toFixed(2));
  }, [taxableAmount]);

  // ===== Final Total =====
  const finalTotal = useMemo(() => {
    return Number((taxableAmount + gstAmount).toFixed(2));
  }, [taxableAmount, gstAmount]);

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
                      onClick={() => handleDecrement(item.product_id, item.quantity)}
                      className="w-8 h-8 flex items-center justify-center text-xl bg-lightBg dark:bg-darkBg2 border border-lightBorder dark:border-darkBorder rounded-lg hover:bg-lightCard dark:hover:bg-darkCard transition"
                    >
                      –
                    </button>

                    <span className="text-xl font-medium">
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
                    onClick={() => handleRemove(item.product_id)}
                    className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

        </div>

        <div className="mt-10">
          <Coupons onApply={(couponObj) => setAppliedCoupon(couponObj)} />
        </div>

        <div className="mt-10 bg-white dark:bg-darkCard border border-lightBorder dark:border-darkBorder p-6 rounded-lg shadow-md">

          {/* === Subtotal === */}
          <div className="flex justify-between mb-4">
            <p className="text-lg text-lightPrimary dark:text-darkPrimary">
              Subtotal
            </p>
            <p className="text-lg font-semibold text-lightPrimary dark:text-darkPrimary">
              ₹{Number(subtotal || 0).toFixed(2)}
            </p>
          </div>

          {/* === Coupon applied (now directly after subtotal) === */}
          {appliedCoupon && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontSize: "14px",
                color: "#007aff"
              }}
            >
              <span>
                Coupon applied ({appliedCoupon.code}) – {appliedCoupon.discount_percent}% of subtotal
              </span>
              <span>-₹{discountAmount.toFixed(2)}</span>
            </div>
          )}

          {/* === GST === */}
          <div className="flex justify-between mb-4">
            <p className="text-lg text-lightPrimary dark:text-darkPrimary">
              GST (5%)
            </p>
            <p className="text-lg font-semibold text-lightPrimary dark:text-darkPrimary">
              ₹{gstAmount.toFixed(2)}
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "#ddd",
              margin: "10px 0"
            }}
          />

          {/* === Final Total === */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "18px",
              fontWeight: "600"
            }}
          >
            <span>Final Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
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
