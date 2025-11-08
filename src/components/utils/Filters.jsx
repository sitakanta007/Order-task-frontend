export default function Filters({ products }) {

  const onSortChange = (type) => {
    let sortedList = [...products];

    if (type === "price_low") sortedList.sort((a, b) => a.price - b.price);
    if (type === "price_high") sortedList.sort((a, b) => b.price - a.price);
    if (type === "latest") sortedList = [...products];

    setSorted(sortedList);
  };

  const onSearch = (text) => {
    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(text.toLowerCase())
    );
    setSorted(filtered);
  };

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
      <h2 className="text-xl font-semibold text-lightPrimary dark:text-darkPrimary relative pb-3">
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
            onChange={(e) => onSortChange(e.target.value)}
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
            onChange={(e) => onSearch(e.target.value)}
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
      </div>
    </aside>
  );
}
