import { User } from '../types';

const SESSION_KEY = 'a2ruedas_session';
// Usamos 127.0.0.1 para evitar problemas de resolución de DNS con localhost en Node v17+
const API_URL = 'http://127.0.0.1:3001/api';

export const db = {
  // --- API CALLS (Server Side) ---

  login: async (email: string, password: string): Promise<User> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al iniciar sesión');
      }

      return await response.json();
    } catch (error: any) {
      console.error("Login Error Details:", error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('No se pudo conectar con el servidor. Verifica que la terminal negra (server.js) esté abierta y sin errores.');
      }
      throw error;
    }
  },

  register: async (user: Omit<User, 'id' | 'role'>): Promise<User> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al registrarse');
      }

      return await response.json();
    } catch (error: any) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('No se pudo conectar con el servidor.');
      }
      throw error;
    }
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      // We don't throw error here to avoid leaking user existence, unless network error
      if (!response.ok && response.status !== 404) {
         throw new Error('Error de conexión');
      }
    } catch (error) {
      throw error;
    }
  },

  confirmPasswordReset: async (email: string, code: string, newPassword: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al restablecer contraseña');
      }
    } catch (error) {
      throw error;
    }
  },

  // --- FAVORITES (Server Side) ---

  getFavorites: async (userId: string): Promise<string[]> => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/favorites`);
      if (!response.ok) return []; // Fallback to empty if error or user not found yet
      return await response.json();
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
  },

  saveFavorites: async (userId: string, favorites: string[]): Promise<void> => {
    try {
      await fetch(`${API_URL}/users/${userId}/favorites`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorites }),
      });
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  },

  // --- SESSION MANAGEMENT (Client Side) ---
  
  setSession: (user: User) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  getSession: (): User | null => {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    return sessionStr ? JSON.parse(sessionStr) : null;
  },

  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
  }
};