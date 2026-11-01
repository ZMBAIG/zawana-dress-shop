import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="section-title mb-4">Product Not Found</h1>
        <Link to="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <div className="container-custom py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-zawana-800">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-zawana-800">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zawana-800">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div>
            <div className="aspect-[3/4] bg-zawana-100 overflow-hidden mb-4">
              <img
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-24 overflow-hidden border-2 transition-colors ${
                      activeImage === i
                        ? "border-zawana-800"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.new && (
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-zawana-600 mb-2">
                New Arrival
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-serif text-zawana-900 mb-3">
              {product.name}
            </h1>
            <p className="text-2xl font-medium text-zawana-800 mb-6">
              ${product.price}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color */}
            <div className="mb-6">
              <p className="text-sm font-medium text-zawana-900 mb-3">
                Color:{" "}
                <span className="font-normal text-gray-600">
                  {selectedColor}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      selectedColor === color
                        ? "border-zawana-800 bg-zawana-50 text-zawana-900"
                        : "border-zawana-200 text-gray-600 hover:border-zawana-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <p className="text-sm font-medium text-zawana-900 mb-3">
                Size:{" "}
                <span className="font-normal text-gray-600">
                  {selectedSize}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-sm border transition-colors ${
                      selectedSize === size
                        ? "border-zawana-800 bg-zawana-800 text-white"
                        : "border-zawana-200 text-gray-600 hover:border-zawana-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAdd}
              className={`w-full btn-primary py-4 text-base ${
                added ? "bg-green-700 hover:bg-green-700" : ""
              }`}
            >
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>

            {/* Extra info */}
            <div className="mt-8 pt-8 border-t border-zawana-100 space-y-3 text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-zawana-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m6.75 4.5v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V18.75m-6.75 0H12m3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0h9.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H5.625c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                Free shipping on orders over $150
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-zawana-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Easy 30-day returns
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-zawana-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
                Secure payment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-zawana-50 border-t border-zawana-100">
          <div className="container-custom">
            <h2 className="section-title mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
