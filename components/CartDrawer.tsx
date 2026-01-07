import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getColorHex } from '../constants';

const CartDrawer: React.FC = () => {
  const { isCartOpen, toggleCart, items, updateQuantity, removeFromCart, cartTotal, openCheckout } = useCart();
  const { user, openAuthModal } = useAuth();

  if (!isCartOpen) return null;

  const handleStartPurchase = () => {
    if (!user) {
      // If user is not logged in, proceed to checkout directly, assuming checkout handles guest or prompts.
      openCheckout();
    } else {
      openCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={toggleCart}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-moto-black font-logo tracking-wider">TU CARRITO</h2>
          <button 
            onClick={toggleCart}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 text-gray-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p>Tu carrito está vacío.</p>
              <button 
                onClick={toggleCart}
                className="text-moto-green font-bold hover:underline"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${item.selectedColor || 'def'}-${idx}`} className="flex gap-4">
                <div className="w-[90px] h-[90px] bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                         <p className="text-xs text-gray-500">{item.subcategory}</p>
                         {item.selectedColor && (
                             <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200 text-gray-700 flex items-center gap-1">
                                <span 
                                    className="w-2 h-2 rounded-full border border-gray-300" 
                                    style={{ backgroundColor: getColorHex(item.selectedColor) }}
                                ></span>
                                {item.selectedColor}
                             </span>
                         )}
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, -1, item.selectedColor)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-2 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1, item.selectedColor)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-moto-green text-sm">${(item.price * item.quantity).toLocaleString('es-AR')}</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id, item.selectedColor)}
                  className="text-gray-400 hover:text-red-500 self-start p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-moto-black">${cartTotal.toLocaleString('es-AR')}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6 text-center">
              Los costos de envío se calculan en el siguiente paso.
            </p>
            <button 
              onClick={handleStartPurchase}
              className="w-full bg-moto-black text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-moto-green transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Iniciar Compra
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;