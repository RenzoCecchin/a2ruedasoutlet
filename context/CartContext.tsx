import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color?: string) => void;
  removeFromCart: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, delta: number, color?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, color?: string) => {
    setItems(prev => {
      // Find item with same ID AND same color
      const existing = prev.find(item => item.id === product.id && item.selectedColor === color);
      
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedColor === color)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string, color?: string) => {
    setItems(prev => prev.filter(item => !(item.id === productId && item.selectedColor === color)));
  };

  const updateQuantity = (productId: string, delta: number, color?: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === productId && item.selectedColor === color) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => setItems([]);

  const toggleCart = () => setIsCartOpen(prev => !prev);
  
  const openCheckout = () => {
    setIsCartOpen(false); // Close cart drawer
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => setIsCheckoutOpen(false);

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      isCartOpen, 
      toggleCart,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};