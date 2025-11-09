import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import cartApi from "@api/cartApi";

export default function Coupons({ onApply = () => {} }) {
  const { user, token } = useSelector((s) => s.auth || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [nextOrderNumber, setNextOrderNumber] = useState(null);
  const [appliedId, setAppliedId] = useState(null);

  // Track whether the user clicked "Check Available Coupons"
  const [hasFetched, setHasFetched] = useState(false);

  const userId = user?.id || user?.user_id || "";

  const fetchCoupons = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      setError("");
      setHasFetched(true);

      const res = await cartApi.getCoupons(userId, token);
      const data = res?.data || {};

      setCoupons(Array.isArray(data.coupons) ? data.coupons : []);
      setNextOrderNumber(
        typeof data.nextOrderNumber === "number" ? data.nextOrderNumber : null
      );
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "Failed to load coupons"
      );
    } finally {
      setLoading(false);
    }
  };

  const applicableIds = useMemo(() => {
    if (nextOrderNumber == null) return new Set();
    const ids = new Set();
    for (const c of coupons) {
      if (Number(c.nth_value) === Number(nextOrderNumber)) {
        ids.add(c.id || c.code);
      }
    }
    return ids;
  }, [coupons, nextOrderNumber]);

  const handleApply = (c) => {
    setAppliedId(c.id || c.code);
    onApply(c);
  };

  return (
    <section
      className="
        mt-6 p-6 rounded-2xl
        bg-lightBg dark:bg-darkBg2
        border border-lightBorder dark:border-darkBorder
        shadow-sm
      "
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-lightPrimary dark:text-darkPrimary">
          Coupons
        </h2>

        <button
          onClick={fetchCoupons}
          disabled={loading || !userId}
          className="
            px-4 py-2 rounded-lg
            bg-brand-600 hover:bg-brand-700
            disabled:opacity-60 disabled:cursor-not-allowed
            text-white font-medium transition
          "
        >
          {loading ? "Checking…" : "Check Available Coupons"}
        </button>
      </div>

      {error ? (
        <div className="p-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      ) : null}

      {hasFetched && !loading && coupons.length === 0 ? (
        <p className="text-lightSecondary dark:text-darkSecondary">
          No coupons available right now.
        </p>
      ) : null}

      <div className="space-y-3">
        {coupons.map((c) => {
          const id = c.id || c.code;
          const pct = Number(c.discount_percent || 0);
          const isApplicable = applicableIds.has(id);
          const isApplied = appliedId === id;

          return (
            <div
              key={id}
              className="
                w-full p-4 rounded-xl
                bg-white dark:bg-darkCard
                border border-lightBorder dark:border-darkBorder
                flex items-center justify-between gap-4
              "
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-semibold text-lightPrimary dark:text-darkPrimary">
                    {c.code}
                  </span>
                  <span className="text-sm text-lightSecondary dark:text-darkSecondary">
                    {pct}% of subtotal
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isApplied ? (
                  <span
                    className="
                      px-3 py-1 rounded-full
                      bg-emerald-100 text-emerald-700
                      dark:bg-emerald-900 dark:text-emerald-200
                      text-sm font-medium
                    "
                  >
                    Coupon Applied
                  </span>
                ) : isApplicable ? (
                  <button
                    onClick={() => handleApply(c)}
                    className="
                      px-4 py-2 rounded-lg
                      bg-brand-600 hover:bg-brand-700
                      text-white font-medium transition
                    "
                  >
                    Apply
                  </button>
                ) : (
                  <span
                    className="
                      px-3 py-1 rounded-full
                      bg-lightBg dark:bg-darkBg
                      border border-lightBorder dark:border-darkBorder
                      text-lightPrimary dark:text-darkPrimary
                      text-sm font-medium
                    "
                  >
                    Applies to order #{c.nth_value}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
