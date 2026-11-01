import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-zawana-950 text-zawana-100">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-serif font-semibold text-white mb-4">Zawana</h3>
            <p className="text-sm text-zawana-300 leading-relaxed">
              Timeless elegance for the modern woman. Discover dresses crafted with passion and designed to celebrate every moment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-zawana-300 hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/shop?category=evening" className="text-zawana-300 hover:text-white transition-colors">Evening Wear</Link></li>
              <li><Link to="/shop?category=casual" className="text-zawana-300 hover:text-white transition-colors">Casual Dresses</Link></li>
              <li><Link to="/about" className="text-zawana-300 hover:text-white transition-colors">Our Story</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-zawana-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-zawana-300 hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-zawana-300 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-zawana-300 hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Stay Inspired</h4>
            <p className="text-sm text-zawana-300 mb-4">
              Join our list for exclusive offers and new arrivals.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2.5 bg-zawana-900 border border-zawana-700 text-white placeholder-zawana-400 text-sm focus:outline-none focus:border-zawana-400"
              />
              <button type="submit" className="btn-primary text-xs py-2.5">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zawana-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zawana-400">
            © {new Date().getFullYear()} Zawana Dress Shop. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-zawana-400 hover:text-white transition-colors" aria-label="Instagram">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" className="text-zawana-400 hover:text-white transition-colors" aria-label="Pinterest">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
              </svg>
            </a>
            <a href="#" className="text-zawana-400 hover:text-white transition-colors" aria-label="Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
