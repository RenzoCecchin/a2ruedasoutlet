import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const FavoritesDrawer: React.FC = () => {
  const { isFavoritesOpen, toggleFavoritesDrawer, favorites, toggleFavorite } = useFavorites();
  const { products } = useProducts();
  const { addToCart, toggleCart } = useCart();

  if (!isFavoritesOpen) return null;

  // Filter full product objects based on favorite IDs
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    // Optional: Remove from favorites after adding to cart? 
    // toggleFavorite(product.id); 
    toggleFavoritesDrawer();
    toggleCart(); // Open cart to show it was added
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={toggleFavoritesDrawer}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-moto-black font-logo tracking-wider flex items-center gap-2">
            TUS FAVORITOS
            <span className="text-moto-green text-sm">({favorites.length})</span>
          </h2>
          <button 
            onClick={toggleFavoritesDrawer}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {favoriteProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 text-gray-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <p>No tienes favoritos guardados.</p>
              <button 
                onClick={toggleFavoritesDrawer}
                className="text-moto-green font-bold hover:underline"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            favoriteProducts.map((product) => (
              <div key={product.id} className="group relative bg-white border border-gray-100 rounded-xl p-3 flex gap-4 hover:shadow-md transition-all">
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">{product.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{product.subcategory}</p>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="font-bold text-moto-black">${product.price.toLocaleString('es-AR')}</span>
                    
                    <button 
                      onClick={() => handleMoveToCart(product)}
                      disabled={product.stock === 0}
                      className={`text-xs px-3 py-1.5 rounded font-bold uppercase transition-colors ${
                        product.stock > 0 
                        ? 'bg-moto-black text-white hover:bg-moto-green' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {product.stock > 0 ? 'Al Carrito' : 'Sin Stock'}
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  title="Quitar de favoritos"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
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

export default FavoritesDrawer;