export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div
      className="
        min-h-screen w-full flex items-center justify-center
        bg-lightBg dark:bg-darkBg
        text-lightPrimary dark:text-darkPrimary
        transition-colors
      "
    >
      <div className="text-center">
        <div
          className="
            w-10 h-10 mx-auto mb-4
            border-4 border-brand-500 border-t-transparent
            rounded-full animate-spin
          "
        ></div>

        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}
