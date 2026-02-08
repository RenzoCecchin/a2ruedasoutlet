import React, { useState, useRef, useEffect } from 'react';
import { getColorHex } from '../constants';
import { Product, SubcategoryGroup } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useFavorites } from '../context/FavoritesContext';

interface FlyingItem {
  id: number;
  image: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
}

const ProductShowcase: React.FC = () => {
  const { products, categories } = useProducts(); 
  const [activeTab, setActiveTab] = useState<string>('');
  // State for hierarchical filtering
  const [activeGroup, setActiveGroup] = useState<SubcategoryGroup | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string>('Todos');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  
  // Selection State for Modal
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Animation States
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Contexts
  const { addToCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentCategory = categories.find(c => c.id === activeTab);

  useEffect(() => {
    if (!activeTab && categories.length > 0) {
      setActiveTab(categories[0].id);
    }
  }, [activeTab, categories]);

  // Initialize active group when category changes
  useEffect(() => {
    if (currentCategory && currentCategory.groups.length > 0) {
      setActiveGroup(currentCategory.groups[0]);
      setActiveSubcategory('Todos');
    }
  }, [currentCategory]);

  // Prevent scroll when modal is open and reset active image/color
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
      setActiveImage(selectedProduct.image);
      // Reset selected color or auto-select first one if available
      if (selectedProduct.colors && selectedProduct.colors.length > 0) {
          setSelectedColor(selectedProduct.colors[0]);
      } else {
          setSelectedColor(null);
      }
    } else {
      document.body.style.overflow = 'unset';
      setActiveImage('');
      setSelectedColor(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  // Use 'products' from context instead of 'PRODUCTS' constant
  const filteredProducts = products.filter(p => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subcategory.toLowerCase().includes(query) ||
        p.compatibleBrands?.some(brand => brand.toLowerCase().includes(query))
      );
    }
    
    // Filter by Main Category (MOTO/PILOTO)
    if (currentCategory?.name !== p.category) return false;

    // Filter by Active Group
    if (!activeGroup) return false;
    
    // Check if product's subcategory belongs to the active group
    const belongsToGroup = activeGroup.items.includes(p.subcategory);
    if (!belongsToGroup) return false;

    // Filter by specific subcategory if selected (and not 'Todos')
    if (activeSubcategory !== 'Todos' && p.subcategory !== activeSubcategory) return false;

    return true;
  });

  const handleGroupClick = (group: SubcategoryGroup) => {
    setActiveGroup(group);
    setActiveSubcategory('Todos');
  };

  const handleAddToCartAnimation = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent opening modal
    
    if (product.stock <= 0) return;

    // AUTH CHECK: Require login to add to cart
    if (!user) {
      openAuthModal();
      return;
    }
    
    // 1. Get positions
    const buttonRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    // Determine which cart button is visible/active
    const desktopCart = document.getElementById('cart-btn');
    const mobileCart = document.getElementById('mobile-cart-btn');
    
    let targetRect;
    
    // Check if desktop cart exists and has width (is visible)
    if (desktopCart && desktopCart.getBoundingClientRect().width > 0) {
        targetRect = desktopCart.getBoundingClientRect();
    } else if (mobileCart) {
        targetRect = mobileCart.getBoundingClientRect();
    } else {
        // Fallback
        targetRect = { top: 20, left: window.innerWidth - 50, width: 0, height: 0 } as DOMRect;
    }

    // 2. Create Flying Item
    const newItem: FlyingItem = {
      id: Date.now(),
      image: product.image,
      start: { x: buttonRect.left, y: buttonRect.top },
      end: { x: targetRect.left, y: targetRect.top }
    };

    setFlyingItems(prev => [...prev, newItem]);

    // 3. Remove item after animation and Update Cart
    setTimeout(() => {
      setFlyingItems(prev => prev.filter(item => item.id !== newItem.id));
      
      // Actual Logic: Add to Cart Context
      // If quick adding from card, we use the first color if available or undefined
      const quickColor = (product.colors && product.colors.length > 0) ? product.colors[0] : undefined;
      addToCart(product, quickColor);
      
      // Show Toast
      const colorText = quickColor ? `(${quickColor})` : '';
      setToastMessage(`${product.name} ${colorText} agregado`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800); // Duration matches CSS animation
  };

  const handleAddToCartFromModal = (product: Product) => {
    if (product.stock <= 0) return;

    // AUTH CHECK: Require login to add to cart
    if (!user) {
      openAuthModal();
      return;
    }

    // Pass the selected color (or undefined if null)
    const colorToAdd = selectedColor || undefined;
    addToCart(product, colorToAdd);
    
    const colorText = colorToAdd ? `(${colorToAdd})` : '';
    setToastMessage(`${product.name} ${colorText} agregado`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setSelectedProduct(null);
  };

  const scrollSubcategories = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300; 
      const newScrollLeft = direction === 'left' 
        ? current.scrollLeft - scrollAmount 
        : current.scrollLeft + scrollAmount;
      
      current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="shop" className="py-20 bg-gray-50 relative scroll-mt-24">
      {/* Floating Animations Container */}
      {flyingItems.map((item) => (
        <div
          key={item.id}
          className="fixed z-[60] rounded-full overflow-hidden shadow-2xl pointer-events-none border-2 border-white"
          style={{
            left: item.start.x,
            top: item.start.y,
            width: '60px',
            height: '60px',
            animation: 'flyToCart 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            '--target-x': `${item.end.x - item.start.x}px`,
            '--target-y': `${item.end.y - item.start.y}px`,
          } as React.CSSProperties}
        >
          <img src={item.image} className="w-full h-full object-cover" alt="flying product" />
        </div>
      ))}

      {/* Elegant Toast Notification */}
      <div 
        className={`fixed bottom-8 right-8 z-[70] bg-zinc-900 text-white px-6 py-4 rounded-lg shadow-2xl border-l-4 border-moto-green transform transition-all duration-500 ease-out flex items-center gap-4 ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <div className="bg-moto-green/20 p-2 rounded-full">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-moto-green">
             <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
           </svg>
        </div>
        <div>
          <h4 className="font-bold text-sm">¡Excelente elección!</h4>
          <p className="text-xs text-gray-400">{toastMessage}</p>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProduct(null)}
          ></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-fade-in-up flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Favorite Button (Modal) */}
            <button 
              onClick={() => toggleFavorite(selectedProduct.id)}
              className="absolute top-4 left-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite(selectedProduct.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isFavorite(selectedProduct.id) ? 'text-red-500' : 'text-gray-400'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>

            {/* Image Side */}
            <div className="w-full md:w-1/2 bg-white flex flex-col border-r border-gray-100">
              <div className="flex-1 relative overflow-hidden flex items-center justify-center p-6 bg-white">
                <img 
                    src={activeImage || selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className={`max-w-full max-h-full object-contain transition-all duration-300 ${selectedProduct.stock === 0 ? 'grayscale' : ''}`}
                />
                {selectedProduct.stock === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
                        <span className="bg-red-600 text-white font-black text-2xl uppercase px-6 py-2 transform -rotate-12 border-4 border-white shadow-xl">
                            AGOTADO
                        </span>
                    </div>
                )}
                {selectedProduct.compatibleBrands && (
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {selectedProduct.compatibleBrands.map(brand => (
                        <span key={brand} className="bg-black/80 backdrop-blur text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                        {brand}
                        </span>
                    ))}
                    </div>
                )}
              </div>
              
              {/* Gallery Thumbnails */}
              {(selectedProduct.gallery && selectedProduct.gallery.length > 0) && (
                <div className="p-4 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto no-scrollbar justify-center">
                  <button 
                    onClick={() => setActiveImage(selectedProduct.image)}
                    className={`w-[74px] h-[74px] flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all p-1 bg-white ${activeImage === selectedProduct.image ? 'border-moto-green ring-2 ring-moto-green/30' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={selectedProduct.image} alt="main" className="w-full h-full object-contain" />
                  </button>
                  {selectedProduct.gallery.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-[74px] h-[74px] flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all p-1 bg-white ${activeImage === img ? 'border-moto-green ring-2 ring-moto-green/30' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`view-${idx}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Side */}
            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <div className="mb-auto">
                <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                  <span>{selectedProduct.category}</span>
                  <span>/</span>
                  <span className="text-moto-green">{selectedProduct.subcategory}</span>
                </div>
                
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-moto-green">$ {selectedProduct.price.toLocaleString('es-AR')}</span>
                    {selectedProduct.stock > 0 && selectedProduct.stock <= 3 && (
                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded animate-pulse">
                            ¡Últimas {selectedProduct.stock} unidades!
                        </span>
                    )}
                </div>
                
                {/* Color Selector */}
                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                    <div className="mb-6 animate-fade-in">
                        <label className="text-sm font-bold text-gray-700 uppercase mb-3 block">Color</label>
                        <div className="flex flex-wrap gap-3">
                            {selectedProduct.colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`relative group p-1 rounded-full border-2 transition-all ${
                                        selectedColor === color 
                                        ? 'border-moto-green scale-110' 
                                        : 'border-transparent hover:border-gray-300'
                                    }`}
                                    title={color}
                                >
                                    <span 
                                        className="block w-8 h-8 rounded-full border border-gray-200 shadow-sm"
                                        style={{ backgroundColor: getColorHex(color) }}
                                    ></span>
                                    {selectedColor === color && (
                                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-1.5 py-0.5 rounded whitespace-nowrap opacity-100 transition-opacity">
                                            {color}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-4 text-gray-600 mb-8">
                  <p className="leading-relaxed">
                    {selectedProduct.description || "Este producto cumple con los más altos estándares de calidad de A2RUEDASOUTLET. Ideal para mantener tu motocicleta en perfectas condiciones o mejorar tu equipamiento personal."}
                  </p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-3">
                      {selectedProduct.stock > 0 ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-moto-green">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Stock Disponible ({selectedProduct.stock})
                          </>
                      ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-red-500 font-bold">Sin Stock Actualmente</span>
                          </>
                      )}
                    </li>
                    <li className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-moto-green">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                      Envío a todo el país
                    </li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => handleAddToCartFromModal(selectedProduct)}
                disabled={selectedProduct.stock === 0}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-3 group ${
                    selectedProduct.stock > 0 
                    ? 'bg-moto-black text-white hover:bg-moto-green' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>{selectedProduct.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}</span>
                {selectedColor && selectedProduct.stock > 0 && <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{selectedColor}</span>}
                {selectedProduct.stock > 0 && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes flyToCart {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          50% {
             transform: translate(calc(var(--target-x) * 0.5), calc(var(--target-y) * 0.1)) scale(0.6);
             opacity: 0.8;
          }
          100% {
            transform: translate(var(--target-x), var(--target-y)) scale(0.1);
            opacity: 0;
          }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">Catálogo Exclusivo</h2>
          <div className="w-24 h-1 bg-moto-green mx-auto"></div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative group">
            <input
              id="product-search-input"
              ref={searchInputRef}
              type="text"
              placeholder="Buscar repuestos, accesorios, indumentaria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none shadow-sm transition-all bg-white"
            />
            <svg 
              onClick={() => searchInputRef.current?.focus()}
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-moto-green transition-colors cursor-pointer"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Categories Tabs */}
        {!searchQuery && (
          <div className="animate-fade-in">
            {/* Main Categories Tabs (MOTO / PILOTO) */}
            <div className="flex justify-center mb-8 space-x-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id);
                  }}
                  className={`pb-2 text-lg font-medium transition-all duration-300 ${
                    activeTab === cat.id 
                      ? 'text-moto-green border-b-2 border-moto-green' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Level 1: Groups (Plásticos, Mecánica, etc.) */}
            <div className="relative mb-6 max-w-full">
              <div className="flex justify-center flex-wrap gap-2 px-4">
                  {currentCategory?.groups.map((group) => (
                    <button
                      key={group.name}
                      onClick={() => handleGroupClick(group)}
                      className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors shadow-sm ${
                        activeGroup?.name === group.name
                          ? 'bg-moto-black text-white'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-black'
                      }`}
                    >
                      {group.name}
                    </button>
                  ))}
              </div>
            </div>

            {/* Level 2: Subcategories (Only if group has >1 items, e.g., Plásticos) */}
            {activeGroup && activeGroup.items.length > 1 && (
              <div className="flex items-center justify-center gap-2 md:gap-5 mb-12 max-w-full animate-fade-in-up px-2 md:px-0">
                {/* Left Arrow */}
                <button 
                  onClick={() => scrollSubcategories('left')}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-moto-green hover:border-moto-green transition-all flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                <div ref={scrollContainerRef} className="overflow-x-auto no-scrollbar scroll-smooth max-w-full">
                  <div className="flex justify-start md:justify-center space-x-2 min-w-max px-4">
                    <button
                      onClick={() => setActiveSubcategory('Todos')}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                        activeSubcategory === 'Todos'
                          ? 'bg-moto-green text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Ver Todos
                    </button>
                    {activeGroup.items.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setActiveSubcategory(sub)}
                        className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                          activeSubcategory === sub
                            ? 'bg-moto-green text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Arrow */}
                <button 
                  onClick={() => scrollSubcategories('right')}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-moto-green hover:border-moto-green transition-all flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCartAnimation} 
              onOpenModal={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>
              {searchQuery 
                ? `No se encontraron resultados para "${searchQuery}"`
                : "No se encontraron productos en esta sección por el momento."
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ 
  product: Product; 
  onAddToCart: (e: React.MouseEvent, product: Product) => void;
  onOpenModal: (product: Product) => void;
}> = ({ product, onAddToCart, onOpenModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [product.image, ...(product.gallery || [])];
  const hasMultipleImages = images.length > 1;
  const { isFavorite, toggleFavorite } = useFavorites();

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div 
      onClick={() => onOpenModal(product)}
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full relative ${product.stock === 0 ? 'opacity-70' : ''}`}
    >
      {/* Out of Stock Badge */}
      {product.stock === 0 && (
        <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
            AGOTADO
        </div>
      )}
      
      {/* Low Stock Badge */}
      {product.stock > 0 && product.stock <= 3 && (
        <div className="absolute top-4 left-4 z-20 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded shadow-md">
            ÚLTIMOS {product.stock}
        </div>
      )}

      {/* Favorite Button */}
      <button 
        onClick={handleToggleFavorite}
        className="absolute top-3 right-3 z-30 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${isFavorite(product.id) ? 'text-red-500' : 'text-gray-400'}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>

      {/* Persistent Favorite Icon if active (even when not hovering) */}
      {isFavorite(product.id) && (
         <div className="absolute top-3 right-3 z-20 p-2 text-red-500 group-hover:opacity-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
         </div>
      )}

      <div className="relative aspect-square overflow-hidden bg-white border-b border-gray-50 flex items-center justify-center p-4">
        <img 
          src={images[currentImageIndex]} 
          alt={product.name} 
          className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ${product.stock === 0 ? 'grayscale' : ''}`}
        />
        {product.compatibleBrands && (
          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm text-white text-[10px] px-2 py-1 uppercase tracking-wide rounded z-10 hidden group-hover:block">
            {product.compatibleBrands[0]}
          </div>
        )}
        
        {/* Colors Preview Badge if multiple colors */}
        {product.colors && product.colors.length > 0 && (
            <div className="absolute bottom-2 right-2 flex -space-x-1.5 z-10">
                {product.colors.slice(0,3).map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: getColorHex(c) }}></div>
                ))}
                {product.colors.length > 3 && <div className="w-3 h-3 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-[6px]">+</div>}
            </div>
        )}

        {/* Image Slider Controls (Visible on Hover if multiple images) */}
        {hasMultipleImages && (
          <>
            <button 
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-400 mb-1 font-medium flex items-center gap-1">
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-moto-green">{product.subcategory}</span>
        </div>
        <h3 className="font-bold text-gray-900 text-base mb-3 line-clamp-2 leading-tight group-hover:text-moto-green transition-colors">{product.name}</h3>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-moto-black">${product.price.toLocaleString('es-AR')}</span>
          <button 
            onClick={(e) => onAddToCart(e, product)}
            disabled={product.stock === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-sm ${
                product.stock > 0 
                ? 'bg-gray-100 text-gray-600 hover:bg-moto-black hover:text-white' 
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
            title={product.stock > 0 ? "Agregar al carrito" : "Sin Stock"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
