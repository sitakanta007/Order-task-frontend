import { useDispatch, useSelector } from "react-redux";
import { setSearch, setSort, clearFilters } from "@redux/slices/productSlice";

export default function Filters() {
  const dispatch = useDispatch();
  const { search, sort } = useSelector((s) => s.products);

  return (
    <aside
      className="
        w-[18rem] shrink-0
        bg-lightCard dark:bg-darkCard2
        border border-lightBorder dark:border-darkBorder
        rounded-2xl shadow-subtle dark:shadow-[0_4px_16px_rgba(0,0,0,0.35)]
        px-5 py-6
      "
    >
      {/* Heading with blue underline */}
      <h2 className="text-md font-semibold text-lightPrimary dark:text-darkPrimary relative pb-3">
        Filters
        <span className="absolute left-0 -bottom-0.5 h-[3px] w-16 rounded-full bg-brand-500"></span>
      </h2>

      <div className="mt-6 space-y-5">
        {/* Sort card */}
        <div className="
          rounded-xl p-4
          bg-lightCard2 dark:bg-darkCard
          border border-lightBorder dark:border-darkBorder
          shadow-subtle
        ">
          <label className="block text-sm font-medium text-lightSecondary dark:text-darkSecondary mb-2">
            Sort By
          </label>
          <select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="
              w-full px-3 py-2 rounded-lg
              bg-lightBg dark:bg-darkBg2
              text-lightPrimary dark:text-darkPrimary
              border border-lightBorder dark:border-darkBorder
              focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400
            "
          >
            <option value="latest">Latest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>

        {/* Search card */}
        <div className="
          rounded-xl p-4
          bg-lightCard2 dark:bg-darkCard
          border border-lightBorder dark:border-darkBorder
          shadow-subtle
        ">
          <label className="block text-sm font-medium text-lightSecondary dark:text-darkSecondary mb-2">
            Search Products
          </label>
          <input
            type="text"
            placeholder="Search by name…"
            onChange={(e) => dispatch(setSearch(e.target.value))}
            value={search}
            className="
              w-full px-3 py-2 rounded-lg
              bg-lightBg dark:bg-darkBg2
              text-lightPrimary dark:text-darkPrimary
              border border-lightBorder dark:border-darkBorder
              focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400
              placeholder:text-slate-400 dark:placeholder:text-slate-500
            "
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => dispatch(clearFilters())}
            className="
              px-4 py-2 mt-2
              text-sm font-medium
              rounded-lg
              bg-brand-500 text-white
              hover:bg-brand-600
              dark:bg-brand-600 dark:hover:bg-brand-700
              shadow-subtle
              transition
            "
          >
            Clear Filters
          </button>
        </div>
      </div>
    </aside>
  );
}
