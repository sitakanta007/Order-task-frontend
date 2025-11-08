import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function ProductCard({ product }) {
  return (
    <div className="
      bg-darkCard border border-darkBorder rounded-xl overflow-hidden
      shadow-md hover:shadow-xl hover:border-accent transition-all 
      hover:-translate-y-1 cursor-pointer
    ">
      
      <div className="w-full h-48 overflow-hidden rounded-none">
        <LazyLoadImage
          src={product.image_url}
          alt={product.title}
          effect="blur"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-md font-semibold line-clamp-2">
          {product.title}
        </h3>

        <p className="text-sm opacity-70 mt-1 line-clamp-2">
          {product.description}
        </p>

        <p className="text-accent font-semibold text-lg mt-3">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
}
