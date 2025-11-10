export default function Message({ messageText }) {
  return (
    <div className="p-10 text-center text-xl text-lightPrimary dark:text-darkPrimary">
        {messageText}
    </div>
  );
}
