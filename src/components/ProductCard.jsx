import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-zawana-100 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.new && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-zawana-900 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
            New
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="block w-full text-center bg-white/95 backdrop-blur-sm text-zawana-900 text-xs font-medium uppercase tracking-wider py-3">
            View Details
          </span>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-zawana-900 group-hover:text-zawana-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        <p className="text-sm font-medium text-zawana-800">${product.price}</p>
      </div>
    </Link>
  );
}
