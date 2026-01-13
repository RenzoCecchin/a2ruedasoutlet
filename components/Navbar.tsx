import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { cartCount, toggleCart } = useCart();
  const { favorites, toggleFavoritesDrawer } = useFavorites();
  const { user, logout, openAuthModal, isAdmin } = useAuth();

  // Effect to trigger shake animation when cart count changes
  useEffect(() => {
    if (cartCount > 0) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const handleSearchClick = () => {
    const shopSection = document.getElementById('shop');
    const searchInput = document.getElementById('product-search-input');

    if (shopSection) {
      const headerOffset = 80;
      const elementPosition = shopSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Focus the input after a short delay to allow scrolling to start
      setTimeout(() => {
        searchInput?.focus();
      }, 800);
    }
    setIsOpen(false);
  };

  const handleShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      const headerOffset = 80;
      const elementPosition = shopSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsOpen(false);
  };

  const handleUserClick = () => {
    if (user) {
      setIsProfileOpen(!isProfileOpen);
    } else {
      openAuthModal();
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer max-w-[60%]" onClick={scrollToTop}>
             <h1 className="font-logo text-lg md:text-3xl tracking-widest text-moto-black truncate">
              A2RUEDAS<span className="text-moto-green">OUTLET</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" onClick={scrollToTop} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">INICIO</a>
            <a href="#shop" onClick={handleShopClick} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">TIENDA</a>
            
            <div className="flex items-center space-x-4 ml-4">
              <button 
                onClick={handleSearchClick}
                className="p-2 text-gray-600 hover:text-black"
                title="Buscar productos"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Favorites Icon */}
              <button 
                onClick={toggleFavoritesDrawer}
                className="p-2 text-gray-600 hover:text-red-500 transition-colors relative"
                title="Mis Favoritos"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                )}
              </button>

              {/* User Icon & Dropdown */}
              <div className="relative">
                <button
                  onClick={handleUserClick}
                  className={`p-2 rounded-full transition-colors flex items-center gap-2 ${user ? 'text-moto-green bg-green-50' : 'text-gray-600 hover:text-black'}`}
                  title={user ? `Hola, ${user.name}` : "Iniciar Sesión"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  {user && <span className="text-xs font-bold max-w-[80px] truncate hidden md:block">{user.name.split(' ')[0]}</span>}
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && user && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden animate-fade-in-up">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    {isAdmin && (
                       <a href="/admin" onClick={(e) => { e.preventDefault(); document.getElementById('admin-panel-section')?.scrollIntoView({behavior:'smooth'}); setIsProfileOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-moto-green">
                         Panel Admin
                       </a>
                    )}
                    <button 
                      onClick={() => { logout(); setIsProfileOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Icon */}
              <button 
                id="cart-btn"
                onClick={toggleCart}
                className={`relative p-2 text-gray-600 hover:text-moto-green transition-colors ${isShaking ? 'animate-cart-bounce' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-moto-green rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Actions - Simplified to prevent crowding */}
          <div className="md:hidden flex items-center gap-2">
            
            {/* Mobile Cart Button - High Priority */}
             <button 
                id="mobile-cart-btn"
                onClick={toggleCart}
                className={`relative p-2 text-gray-800 ${isShaking ? 'animate-cart-bounce' : ''}`}
                aria-label="Carrito"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-moto-green rounded-full border-2 border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 p-2 focus:outline-none" aria-label="Menu">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl max-h-[85vh] overflow-y-auto animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-2">
            
            {/* Main Navigation */}
            <a href="#" onClick={(e) => { scrollToTop(e); setIsOpen(false); }} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50 active:bg-gray-100">
              INICIO
            </a>
            <a href="#shop" onClick={(e) => { handleShopClick(e); setIsOpen(false); }} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50 active:bg-gray-100">
              TIENDA
            </a>
            
            <div className="border-t border-gray-100 my-2"></div>

            {/* Favorites (Moved to Menu) */}
            <button 
                onClick={() => { toggleFavoritesDrawer(); setIsOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50"
            >
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    Mis Favoritos
                </div>
                {favorites.length > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{favorites.length}</span>}
            </button>

            {/* User Account Actions (Moved to Menu) */}
            {user ? (
                <div className="space-y-1">
                    <div className="px-4 py-3 bg-gray-50 rounded-lg mb-2">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Hola,</p>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    {isAdmin && (
                        <a href="/admin" onClick={(e) => { e.preventDefault(); document.getElementById('admin-panel-section')?.scrollIntoView({behavior:'smooth'}); setIsOpen(false); }} className="block px-4 py-3 rounded-lg text-base font-medium text-moto-green hover:bg-green-50">
                            ⚙️ Panel Administrador
                        </a>
                    )}
                    <button 
                        onClick={() => { logout(); setIsOpen(false); }}
                        className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 flex items-center gap-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        Cerrar Sesión
                    </button>
                </div>
            ) : (
                <button 
                    onClick={() => { openAuthModal(); setIsOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-moto-green bg-green-50 hover:bg-green-100 flex items-center gap-3 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Iniciar Sesión / Registrarse
                </button>
            )}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes cart-bounce {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(0.9); }
          75% { transform: scale(1.1); }
        }
        .animate-cart-bounce {
          animation: cart-bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;