import { Link, useLocation, Navigate } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-zawana-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full bg-white p-8 md:p-12 shadow-sm text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-serif text-zawana-900 mb-3">Thank You!</h1>
        <p className="text-gray-600 mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          A confirmation email has been sent to <strong>{order.email}</strong>
        </p>

        <div className="bg-zawana-50 p-5 mb-8 text-left">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Order Number</span>
            <span className="font-medium text-zawana-900">{order.orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Paid</span>
            <span className="font-medium text-zawana-900">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {order.items && order.items.length > 0 && (
          <div className="border-t border-zawana-100 pt-6 mb-8 text-left">
            <p className="text-sm font-medium text-zawana-900 mb-3">Items Ordered</p>
            <ul className="space-y-2">
              {order.items.map((item) => (
                <li key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} <span className="text-gray-400">× {item.quantity}</span>
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop" className="btn-primary">
            Continue Shopping
          </Link>
          <Link to="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
