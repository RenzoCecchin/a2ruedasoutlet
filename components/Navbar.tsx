import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  
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

  // PWA logic and device detection
  useEffect(() => {
    // 1. Check if app is already installed (Standalone mode)
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsStandalone(isInStandaloneMode);

    // 2. Enhanced iOS Detection
    // Checks User Agent and Platform for robustness
    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = (window.navigator as any).platform?.toLowerCase() || '';
    
    const isIphone = /iphone|ipod/.test(userAgent);
    const isIpad = /ipad/.test(userAgent) || (platform.includes('mac') && navigator.maxTouchPoints > 1);
    
    const isIOSDevice = isIphone || isIpad;
    setIsIOS(isIOSDevice);

    // 3. Standard PWA prompt for Android/Desktop
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(e);
      console.log("PWA Install Prompt captured");
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (!installPrompt) {
        console.log("No install prompt available");
        return;
    }
    
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
        console.log('User accepted PWA');
        setInstallPrompt(null);
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      const headerOffset = 80;
      const elementPosition = shopSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Logic to determine if we show the button
  // Don't show if already installed (isStandalone)
  // Show if we have the prompt (Android/Desktop) OR if it is iOS (since iOS doesn't give us a prompt, we always offer the manual instructions)
  const showInstallButton = !isStandalone && (!!installPrompt || isIOS);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          <div className="flex-shrink-0 flex items-center cursor-pointer max-w-[50%]" onClick={scrollToTop}>
             <h1 className="font-logo text-lg md:text-3xl tracking-widest text-moto-black truncate">
              A2RUEDAS<span className="text-moto-green">OUTLET</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" onClick={scrollToTop} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">INICIO</a>
            <a href="#shop" onClick={handleShopClick} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">TIENDA</a>
            
            {/* Install App Button (Desktop) */}
            {showInstallButton && (
              <button 
                onClick={handleInstallClick}
                className="bg-moto-black hover:bg-moto-green text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-2 shadow-md hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Instalar App
              </button>
            )}

            <div className="flex items-center space-x-4 ml-4">
              <button onClick={toggleFavoritesDrawer} className="p-2 text-gray-600 hover:text-red-500 transition-colors relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {favorites.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
              </button>

              <div className="relative">
                <button onClick={() => user ? setIsProfileOpen(!isProfileOpen) : openAuthModal()} className={`p-2 rounded-full transition-colors flex items-center gap-2 ${user ? 'text-moto-green bg-green-50' : 'text-gray-600 hover:text-black'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </button>
                {isProfileOpen && user && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden animate-fade-in-up">
                    <div className="px-4 py-3 border-b border-gray-100 text-sm font-bold text-gray-900 truncate">{user.name}</div>
                    <button onClick={() => { logout(); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Cerrar Sesión</button>
                  </div>
                )}
              </div>

              <button onClick={toggleCart} className={`relative p-2 text-gray-600 hover:text-moto-green transition-colors ${isShaking ? 'animate-cart-bounce' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {cartCount > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-moto-green rounded-full">{cartCount}</span>}
              </button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-1">
            {/* Install Button for Mobile - Now with text for visibility */}
            {showInstallButton && (
              <button 
                onClick={handleInstallClick}
                className="flex items-center gap-1 bg-moto-green/10 text-moto-green hover:bg-moto-green hover:text-white px-3 py-1.5 rounded-full transition-all animate-pulse border border-moto-green/20 mr-1"
                title="Instalar App"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span className="text-xs font-bold">App</span>
              </button>
            )}

             <button onClick={toggleCart} className={`relative p-2 text-gray-800 ${isShaking ? 'animate-cart-bounce' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {cartCount > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-moto-green rounded-full border-2 border-white shadow-sm">{cartCount}</span>}
              </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 p-2"><svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg></button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <a href="#" onClick={(e) => { scrollToTop(e); setIsOpen(false); }} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-800">INICIO</a>
            <a href="#shop" onClick={(e) => { handleShopClick(e); setIsOpen(false); }} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-800">TIENDA</a>
            <button onClick={() => { toggleFavoritesDrawer(); setIsOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-800 flex justify-between">Mis Favoritos {favorites.length > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{favorites.length}</span>}</button>
            {user ? (
                <>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase">Hola,</p>
                    <p className="font-bold text-gray-900">{user.name}</p>
                  </div>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-4 py-3 text-red-600 font-medium">Cerrar Sesión</button>
                </>
            ) : (
                <button onClick={() => { openAuthModal(); setIsOpen(false); }} className="w-full text-left px-4 py-3 text-moto-green font-bold">Iniciar Sesión / Registrarse</button>
            )}
          </div>
        </div>
      )}

      {/* iOS Installation Instruction Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowIOSModal(false)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl shadow-2xl p-8 animate-fade-in-up">
            <button onClick={() => setShowIOSModal(false)} className="absolute top-4 right-4 text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-moto-light rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm">
                 <img src="https://cdn-icons-png.flaticon.com/512/3097/3097007.png" className="w-10 h-10" alt="logo" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instalar en iPhone</h3>
              <p className="text-gray-500 text-sm mb-6">Para instalar esta app en tu iPhone, sigue estos pasos en Safari:</p>
              
              <div className="space-y-6 text-left">
                <div className="flex items-center gap-4">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-moto-black text-white flex items-center justify-center font-bold">1</div>
                   <p className="text-sm text-gray-700 flex items-center gap-2">
                     Toca el icono de <strong>"Compartir"</strong>
                     <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                   </p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-moto-black text-white flex items-center justify-center font-bold">2</div>
                   <p className="text-sm text-gray-700">Desliza y selecciona <strong>"Agregar al inicio"</strong>.</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-moto-black text-white flex items-center justify-center font-bold">3</div>
                   <p className="text-sm text-gray-700">Toca <strong>"Agregar"</strong> arriba a la derecha.</p>
                </div>
              </div>

              <button 
                onClick={() => setShowIOSModal(false)}
                className="w-full mt-8 bg-moto-green text-white font-bold py-3 rounded-xl shadow-lg"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes cart-bounce { 0%, 100% { transform: scale(1); } 25% { transform: scale(1.3); } 50% { transform: scale(0.9); } 75% { transform: scale(1.1); } }
        .animate-cart-bounce { animation: cart-bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }
      `}</style>
    </nav>
  );
};

export default Navbar;