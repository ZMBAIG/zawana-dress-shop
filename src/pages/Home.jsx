import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products.filter((p) => p.new).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=1000&fit=crop"
            alt="Elegant woman in dress"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-xl text-white">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 text-white/80">New Season</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-6">
              Dresses That Tell Your Story
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Discover the new collection of elegant dresses designed for the moments that matter most.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary bg-white text-zawana-900 hover:bg-zawana-100">
                Shop Collection
              </Link>
              <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-zawana-900">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Shop by Occasion</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Find the perfect dress for every moment of your life.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Evening', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop', cat: 'evening' },
              { name: 'Casual', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop', cat: 'casual' },
              { name: 'Formal', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop', cat: 'formal' },
              { name: 'Summer', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop', cat: 'summer' },
            ].map((item) => (
              <Link
                key={item.cat}
                to={`/shop?category=${item.cat}`}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg md:text-xl font-serif tracking-wide">
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="section-title mb-2">Featured Collection</h2>
              <p className="text-gray-500">Handpicked pieces for the season</p>
            </div>
            <Link to="/shop" className="text-sm font-medium text-zawana-800 uppercase tracking-wider hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=800&fit=crop"
            alt="Fashion lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-zawana-950/60" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-white/80">Crafted with Love</p>
          <h2 className="text-3xl md:text-5xl font-serif mb-6 max-w-2xl mx-auto">
            Every Dress is a Masterpiece
          </h2>
          <p className="text-white/90 max-w-lg mx-auto mb-8">
            From the finest fabrics to the most meticulous detailing, each Zawana dress is made to make you feel extraordinary.
          </p>
          <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-zawana-900">
            Discover Our Craft
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="section-title mb-2">New Arrivals</h2>
              <p className="text-gray-500">Just landed — be the first to wear them</p>
            </div>
            <Link to="/shop" className="text-sm font-medium text-zawana-800 uppercase tracking-wider hover:underline">
              Shop New →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-zawana-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The Aurora gown made me feel like a goddess on my anniversary. The quality is exceptional.",
                name: "Sophia R.",
                location: "New York",
              },
              {
                quote: "I've never received so many compliments. Zawana dresses fit perfectly and the fabric is heavenly.",
                name: "Amelia K.",
                location: "London",
              },
              {
                quote: "From casual to formal, every piece I own from Zawana is a treasure. Truly timeless designs.",
                name: "Isabella M.",
                location: "Paris",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 text-center">
                <div className="text-gold-500 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{t.quote}"</p>
                <p className="font-medium text-zawana-900">{t.name}</p>
                <p className="text-sm text-gray-400">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram-style strip */}
      <section className="py-12">
        <div className="container-custom">
          <p className="text-center text-sm uppercase tracking-wider text-gray-500 mb-6">
            Follow @zawana on Instagram
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[
              'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=300&fit=crop',
            ].map((src, i) => (
              <a key={i} href="#" className="aspect-square overflow-hidden group">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
