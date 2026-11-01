import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    let result = activeCategory === 'all'
      ? [...products]
      : products.filter((p) => p.category === activeCategory);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [activeCategory, sortBy]);

  const setCategory = (cat) => {
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-zawana-100 py-12 md:py-16">
        <div className="container-custom text-center">
          <h1 className="section-title mb-3">Shop Dresses</h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Explore our curated collection of elegant dresses for every occasion.
          </p>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-zawana-800 text-white'
                    : 'bg-white text-gray-600 border border-zawana-200 hover:border-zawana-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-500">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-zawana-200 px-3 py-2 text-sm focus:outline-none focus:border-zawana-400 bg-white"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing {filtered.length} {filtered.length === 1 ? 'dress' : 'dresses'}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No dresses found in this category.</p>
            <button
              onClick={() => setCategory('all')}
              className="btn-primary"
            >
              View All Dresses
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
