import { useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "@api/axiosClient";

export default function Coupons() {
  const auth = useSelector((s) => s.auth);

  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFetchCoupons = async () => {
    if (!auth?.user?.id || !auth?.token) {
      setErrorMsg("Please login first.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const res = await axiosClient.get(`/coupons/${auth.user.id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setCoupons(res.data?.coupons || []);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-darkCard border border-lightBorder dark:border-darkBorder p-6 rounded-lg shadow-sm">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-lightPrimary dark:text-darkPrimary">
          Coupons
        </h2>

        <button
          onClick={handleFetchCoupons}
          className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition"
        >
          Check Available Coupons
        </button>
      </div>

      {errorMsg && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {errorMsg}
        </div>
      )}

      {loading && (
        <div className="mt-4 text-lightPrimary dark:text-darkPrimary text-sm">
          Loading coupons...
        </div>
      )}

      {!loading && coupons.length > 0 && (
        <div className="mt-5 space-y-4">
          {coupons.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-lg bg-lightBg dark:bg-darkBg2 border border-lightBorder dark:border-darkBorder"
            >
              <p className="text-lg font-bold text-lightPrimary dark:text-darkPrimary">
                {c.code}
              </p>

              <p className="text-sm text-lightSecondary dark:text-darkSecondary mt-1">
                Type: {c.type}
              </p>

              {c.discount_percent && (
                <p className="text-sm text-lightSecondary dark:text-darkSecondary">
                  Discount: {c.discount_percent} percent
                </p>
              )}

              {c.flat_amount && (
                <p className="text-sm text-lightSecondary dark:text-darkSecondary">
                  Flat Amount: ₹{c.flat_amount}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && coupons.length === 0 && !errorMsg && (
        <div className="mt-4 text-lightSecondary dark:text-darkSecondary text-sm">
          No coupons available.
        </div>
      )}
    </div>
  );
}
