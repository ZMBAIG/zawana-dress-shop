import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment, 3 = Processing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const [payment, setPayment] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const shippingCost = totalPrice >= 150 ? 0 : 12.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingCost + tax;

  if (items.length === 0 && step !== 3) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="section-title mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some beautiful dresses before checking out.</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16);
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 3) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
    }
    if (name === 'cvc') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }

    setPayment({ ...payment, [name]: value });
  };

  const validateShipping = () => {
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zip'];
    for (const field of required) {
      if (!shipping[field].trim()) {
        setError(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const validatePayment = () => {
    if (!payment.cardName.trim()) {
      setError('Please enter the name on card');
      return false;
    }
    const digits = payment.cardNumber.replace(/\s/g, '');
    if (digits.length < 15) {
      setError('Please enter a valid card number');
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (payment.cvc.length < 3) {
      setError('Please enter a valid CVC');
      return false;
    }
    setError('');
    return true;
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validatePayment()) return;

    setLoading(true);
    setError('');
    setStep(3);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2200));

    // Simulate occasional failure for realism (10% chance) – remove in real integration
    const success = Math.random() > 0.08;

    if (success) {
      clearCart();
      navigate('/order-success', {
        state: {
          orderId: 'ZW' + Date.now().toString().slice(-8),
          total: grandTotal,
          email: shipping.email,
          items: [...items],
        },
      });
    } else {
      setError('Payment declined. Please try another card or contact your bank.');
      setStep(2);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zawana-50">
      {/* Header */}
      <div className="bg-white border-b border-zawana-100">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-serif font-semibold text-zawana-900">
              Zawana
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className={step >= 1 ? 'text-zawana-800 font-medium' : ''}>Shipping</span>
              <span>→</span>
              <span className={step >= 2 ? 'text-zawana-800 font-medium' : ''}>Payment</span>
              <span>→</span>
              <span className={step >= 3 ? 'text-zawana-800 font-medium' : ''}>Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left - Forms */}
          <div className="lg:col-span-3">
            {step === 1 && (
              <form onSubmit={handleContinueToPayment} className="bg-white p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-serif text-zawana-900 mb-6">Shipping Information</h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-zawana-900 mb-1.5">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={shipping.firstName}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zawana-900 mb-1.5">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={shipping.lastName}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-zawana-900 mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={shipping.email}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zawana-900 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shipping.phone}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-zawana-900 mb-1.5">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={shipping.address}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-zawana-900 mb-1.5">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={shipping.city}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zawana-900 mb-1.5">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={shipping.state}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zawana-900 mb-1.5">ZIP Code *</label>
                    <input
                      type="text"
                      name="zip"
                      value={shipping.zip}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary py-4">
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePlaceOrder} className="bg-white p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif text-zawana-900">Payment</h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-zawana-600 hover:text-zawana-800"
                  >
                    ← Edit shipping
                  </button>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {/* Demo notice */}
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                  <strong>Demo Mode:</strong> Use any card number (e.g. 4242 4242 4242 4242), any future expiry, and any 3-digit CVC. No real charges.
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-zawana-900 mb-1.5">Name on Card *</label>
                  <input
                    type="text"
                    name="cardName"
                    value={payment.cardName}
                    onChange={handlePaymentChange}
                    className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm"
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-zawana-900 mb-1.5">Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={payment.cardNumber}
                    onChange={handlePaymentChange}
                    className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm tracking-wider"
                    placeholder="4242 4242 4242 4242"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-zawana-900 mb-1.5">Expiry *</label>
                    <input
                      type="text"
                      name="expiry"
                      value={payment.expiry}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zawana-900 mb-1.5">CVC *</label>
                    <input
                      type="text"
                      name="cvc"
                      value={payment.cvc}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-3 border border-zawana-200 focus:outline-none focus:border-zawana-500 text-sm"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                {/* Accepted cards visual */}
                <div className="flex items-center gap-3 mb-6 text-xs text-gray-400">
                  <span>We accept:</span>
                  <span className="font-medium text-gray-600">Visa</span>
                  <span className="font-medium text-gray-600">Mastercard</span>
                  <span className="font-medium text-gray-600">Amex</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 disabled:opacity-60"
                >
                  {loading ? 'Processing…' : `Pay $${grandTotal.toFixed(2)}`}
                </button>

                <p className="mt-4 text-xs text-center text-gray-400">
                  Your payment information is encrypted and secure.
                </p>
              </form>
            )}

            {step === 3 && (
              <div className="bg-white p-10 shadow-sm text-center">
                <div className="w-16 h-16 mx-auto mb-6 border-4 border-zawana-200 border-t-zawana-800 rounded-full animate-spin" />
                <h2 className="text-xl font-serif text-zawana-900 mb-2">Processing your payment</h2>
                <p className="text-gray-500">Please wait a moment…</p>
              </div>
            )}
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-serif text-zawana-900 mb-5">Order Summary</h3>

              <ul className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <li key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover bg-zawana-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zawana-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.size} / {item.color} × {item.quantity}
                      </p>
                      <p className="text-sm text-zawana-800 mt-0.5">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-zawana-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-medium text-zawana-900 pt-2 border-t border-zawana-100">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {totalPrice < 150 && (
                <p className="mt-4 text-xs text-zawana-600 bg-zawana-50 p-3">
                  Add ${(150 - totalPrice).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
