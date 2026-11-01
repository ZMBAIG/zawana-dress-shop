import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zawana-100">
            <h2 className="text-lg font-serif font-medium text-zawana-900">
              Your Cart ({items.length})
            </h2>
            <button
              onClick={closeCart}
              className="p-1 text-gray-500 hover:text-zawana-800 transition-colors"
              aria-label="Close cart"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg className="h-16 w-16 text-zawana-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-gray-500 mb-6">Your cart is empty</p>
                <Link to="/shop" onClick={closeCart} className="btn-primary">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <ul className="space-y-5">
                {items.map((item) => (
                  <li key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover bg-zawana-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-zawana-900 truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.size} / {item.color}
                      </p>
                      <p className="text-sm font-medium text-zawana-800 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-zawana-200">
                          <button
                            onClick={() => updateQuantity(item, item.quantity - 1)}
                            className="px-2 py-1 text-sm text-gray-600 hover:bg-zawana-50"
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="px-3 py-1 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item, item.quantity + 1)}
                            className="px-2 py-1 text-sm text-gray-600 hover:bg-zawana-50"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item)}
                          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-zawana-100 px-6 py-5 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-zawana-900">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400">Shipping & taxes calculated at checkout</p>
              <button onClick={handleCheckout} className="w-full btn-primary py-3.5">
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full text-xs text-gray-500 hover:text-zawana-800 transition-colors py-1"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
