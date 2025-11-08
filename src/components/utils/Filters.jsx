export default function Filters({ onSortChange }) {
  return (
    <div className="w-64 p-4 border-r border-darkBorder bg-darkCard">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-4">
        <label className="block mb-2">Sort By</label>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 rounded bg-darkBg border border-darkBorder"
        >
          <option value="latest">Latest</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
