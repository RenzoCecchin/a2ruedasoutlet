import { User } from '../types';

const TOKEN_KEY = 'a2ruedas_token';
const REFRESH_TOKEN_KEY = 'a2ruedas_refresh_token';
const USER_KEY = 'a2ruedas_user';
const API_URL = '/api';

// --- HELPER FUNCTIONS ---

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getAuthHeaders = (token?: string) => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const actualToken = token || localStorage.getItem(TOKEN_KEY);
  if (actualToken) {
    headers.Authorization = `Bearer ${actualToken}`;
  }
  return headers;
};

export const db = {
  // --- AUTHENTICATION ---

  login: async (email: string, password: string): Promise<User> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Credenciales inválidas');
      }

      const data = await response.json();
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      return data.user;
    } catch (error: any) {
      throw new Error(error.message || 'Error de conexión');
    }
  },

  register: async (userPayload: Omit<User, 'id' | 'role'>): Promise<User> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al registrarse');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Error de registro');
    }
  },

  verifyEmail: async (email: string, token: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error verificando email');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error solicitando reset');
      }
    } catch (error: any) {
      console.warn('Password reset request failed:', error.message);
    }
  },

  confirmPasswordReset: async (email: string, token: string, newPassword: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error reseteando contraseña');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // --- FAVORITES ---

  getFavorites: async (userId: string): Promise<string[]> => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/favorites`);
      if (!response.ok) throw new Error('Network error');
      return (await response.json()).favorites || [];
    } catch (error) {
      return [];
    }
  },

  saveFavorites: async (userId: string, favorites: string[]): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      await fetch(`${API_URL}/users/${userId}/favorites`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ favorites }),
      });
    } catch (error) {
      console.error('Failed to save favorites');
    }
  },

  // --- SESSION (JWT based) ---

  setSession: (user: User) => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Session Save Error', e);
    }
  },

  getSession: (): User | null => {
    try {
      const userStr = localStorage.getItem(USER_KEY);
      const token = localStorage.getItem(TOKEN_KEY);
      return userStr && token ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error('Session Read Error', e);
      return null;
    }
  },

  clearSession: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // --- STOCK INTEGRATION ---

  syncStock: async (products: import('../types').Product[]): Promise<import('../types').Product[]> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`${API_URL}/products/sync-stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Network error syncing stock');
      }
      const data = await response.json();
      return data.products || products;
    } catch (error) {
      console.error('Failed to sync stock, returning local products', error);
      return products;
    }
  }
};