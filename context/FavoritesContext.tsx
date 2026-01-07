import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../services/db';

interface FavoritesContextType {
  favorites: string[]; // Array of Product IDs
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  isFavoritesOpen: boolean;
  toggleFavoritesDrawer: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const { user } = useAuth();

  // 1. Initial Load (Guest)
  useEffect(() => {
    if (!user) {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            setFavorites(JSON.parse(saved));
        }
    }
  }, []);

  // 2. Sync with Server when User logs in
  useEffect(() => {
    if (user) {
      // Load favorites from server
      db.getFavorites(user.id).then(serverFavorites => {
        setFavorites(serverFavorites);
        // Also update local storage to keep them in sync visually
        localStorage.setItem('favorites', JSON.stringify(serverFavorites));
      });
    } else {
      // If user logs out, we might want to keep the local storage or clear it.
      // For now, let's revert to whatever is in local storage (guest mode)
      const saved = localStorage.getItem('favorites');
      if (saved) setFavorites(JSON.parse(saved));
      else setFavorites([]);
    }
  }, [user]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      let newFavorites;
      if (prev.includes(productId)) {
        newFavorites = prev.filter(id => id !== productId);
      } else {
        newFavorites = [...prev, productId];
      }

      // Always save to localStorage (works for guest and as cache)
      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      // If User is Logged In, Sync to Server
      if (user) {
        db.saveFavorites(user.id, newFavorites);
      }

      return newFavorites;
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const toggleFavoritesDrawer = () => setIsFavoritesOpen(prev => !prev);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, isFavoritesOpen, toggleFavoritesDrawer }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};