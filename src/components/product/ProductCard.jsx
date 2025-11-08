import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function ProductCard({ product }) {
  return (
    <div className="
      rounded-xl overflow-hidden
      bg-lightCard dark:bg-darkCard
      border border-lightBorder/70 dark:border-darkBorder/60
      hover:border-accent
      shadow-sm hover:shadow-lg 
      dark:hover:shadow-[0_0_18px_rgba(79,110,247,0.4)]
      transition-all duration-200
    ">
      
      <div className="w-full h-48 bg-lightBg2 dark:bg-darkBg2 overflow-hidden">
        <LazyLoadImage
          src={product.image_url}
          alt={product.title}
          effect="blur"
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-md font-semibold text-lightPrimary dark:text-darkPrimary leading-tight">
          {product.title}
        </h3>

        <p className="text-sm mt-2 text-lightSecondary dark:text-darkSecondary line-clamp-2">
          {product.description}
        </p>

        <p className="text-md font-bold mt-3 text-accent dark:text-accent">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
}
