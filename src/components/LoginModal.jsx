export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 bg-black/40 backdrop-blur-sm
        flex items-center justify-center
        z-50
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md p-6 rounded-2xl
          bg-lightCard dark:bg-darkCard
          border border-lightBorder dark:border-darkBorder
          shadow-[0_4px_16px_rgba(0,0,0,0.2)]
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-lightPrimary dark:text-darkPrimary">
            Login
          </h2>
          <button
            onClick={onClose}
            className="text-lg text-lightSecondary dark:text-darkSecondary hover:text-lightPrimary dark:hover:text-darkPrimary transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-lightSecondary dark:text-darkSecondary">
              Email
            </label>
            <input
              type="email"
              className="
                w-full px-3 py-2 rounded-lg
                bg-lightBg dark:bg-darkBg2
                border border-lightBorder dark:border-darkBorder
                text-lightPrimary dark:text-darkPrimary
                focus:outline-none focus:ring-2 focus:ring-brand-500
              "
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-lightSecondary dark:text-darkSecondary">
              Password
            </label>
            <input
              type="password"
              className="
                w-full px-3 py-2 rounded-lg
                bg-lightBg dark:bg-darkBg2
                border border-lightBorder dark:border-darkBorder
                text-lightPrimary dark:text-darkPrimary
                focus:outline-none focus:ring-2 focus:ring-brand-500
              "
              placeholder="Enter your password"
            />
          </div>

          {/* Submit */}
          <button
            className="
              w-full py-2.5 mt-2 rounded-lg
              bg-brand-500 hover:bg-brand-600 
              dark:bg-brand-600 dark:hover:bg-brand-700
              text-white font-semibold transition
            "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
