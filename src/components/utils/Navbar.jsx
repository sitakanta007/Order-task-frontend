import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full border-b border-darkBorder bg-darkCard p-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-semibold">
        E-Store
      </Link>

      <div className="flex items-center gap-6">
        <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-green-700">
          Login
        </button>

        <button className="px-4 py-2 bg-darkBorder rounded-md">
          Cart (0)
        </button>

        <ThemeToggle />
      </div>
    </div>
  );
}
