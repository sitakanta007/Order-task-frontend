export default function LoadingOverlay({ text = "Please wait..." }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-50"
    >
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-lg font-medium">{text}</p>
    </div>
  );
}
