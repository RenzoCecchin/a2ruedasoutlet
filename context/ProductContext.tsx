import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';

interface ProductContextType {
  products: Product[];
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  decrementStock: (items: { id: string; quantity: number }[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY = 'a2ruedas_inventory_v1';

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state lazy-loading from localStorage or falling back to constants
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    // Constants now include stock
    return INITIAL_PRODUCTS;
  });

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const decrementStock = (itemsToDecrement: { id: string; quantity: number }[]) => {
    setProducts(prev => prev.map(product => {
      const itemInCart = itemsToDecrement.find(i => i.id === product.id);
      if (itemInCart) {
        const newStock = Math.max(0, product.stock - itemInCart.quantity);
        return { ...product, stock: newStock };
      }
      return product;
    }));
  };

  return (
    <ProductContext.Provider value={{ products, updateProduct, deleteProduct, addProduct, decrementStock }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};