import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="
        min-h-[80vh] flex flex-col items-center justify-center
        px-6 text-center
      "
    >
      {/* Big 404 Number */}
      <h1
        className="
          text-7xl font-extrabold
          text-brand-500 dark:text-brand-400
          drop-shadow-[0_2px_6px_rgba(0,0,0,0.1)]
        "
      >
        404
      </h1>

      {/* Title */}
      <h2
        className="
          mt-4 text-3xl font-semibold
          text-lightPrimary dark:text-darkPrimary
        "
      >
        Page Not Found
      </h2>

      {/* Subtitle */}
      <p
        className="
          mt-3 text-lightSecondary dark:text-darkSecondary
          max-w-md leading-relaxed
        "
      >
        The page you're looking for doesn’t exist. It might have been moved,
        deleted, or you may have typed the wrong URL.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex items-center gap-4">
        <Link
          to="/"
          className="
            px-5 py-2.5 rounded-lg text-white font-medium
            bg-brand-500 hover:bg-brand-600
            dark:bg-brand-600 dark:hover:bg-brand-700
            shadow-subtle transition
          "
        >
          Go to Home
        </Link>

        <Link
          to="/"
          className="
            px-5 py-2.5 rounded-lg font-medium
            border border-lightBorder dark:border-darkBorder
            bg-lightCard dark:bg-darkCard
            text-lightPrimary dark:text-darkPrimary
            hover:bg-lightCard2 dark:hover:bg-darkCard2
            transition
          "
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
