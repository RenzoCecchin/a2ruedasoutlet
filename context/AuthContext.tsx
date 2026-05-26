import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { db } from '../services/db';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  verifyEmail: (email: string, token: string) => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, token: string, newPassword: string) => Promise<void>;
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

  // Initialize session from local storage
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
    const result = await db.register({ name, email, password });
    // Usuario se registra pero debe verificar email antes de poder hacer login
  };

  const verifyEmail = async (email: string, token: string) => {
    await db.verifyEmail(email, token);
  };

  const recoverPassword = async (email: string) => {
    // Solicita token de reset por email
    await db.requestPasswordReset(email);
  };

  const resetPassword = async (email: string, token: string, newPassword: string) => {
    // Valida token + contraseña
    await db.confirmPasswordReset(email, token, newPassword);
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
      verifyEmail,
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