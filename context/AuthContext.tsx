import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { db } from '../services/db';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Initialize session from local storage (Client side persistence)
  useEffect(() => {
    const sessionUser = db.getSession();
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const foundUser = await db.login(email, password);
    if (foundUser) {
      setUser(foundUser);
      db.setSession(foundUser);
      closeAuthModal();
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const newUser = await db.register({ name, email, password });
    if (newUser) {
      setUser(newUser);
      db.setSession(newUser);
      closeAuthModal();
    }
  };

  const recoverPassword = async (email: string) => {
    // Requests the code from server
    await db.requestPasswordReset(email);
  };

  const resetPassword = async (email: string, code: string, newPassword: string) => {
    // Sends code + new password to server
    await db.confirmPasswordReset(email, code, newPassword);
  };

  const logout = () => {
    setUser(null);
    db.clearSession();
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      recoverPassword,
      resetPassword,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};