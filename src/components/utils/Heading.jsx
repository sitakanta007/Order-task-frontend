export default function Heading({ headingText }) {
  return (
    <h1 className="text-xl font-bold mb-6 text-lightPrimary dark:text-darkPrimary">
        {headingText}
    </h1>
  );
}
