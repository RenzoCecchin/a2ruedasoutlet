import { User } from '../types';

const SESSION_KEY = 'a2ruedas_session';
const API_URL = 'http://127.0.0.1:3001/api';
const MOCK_DB_KEY = 'a2ruedas_mock_db_users';

// --- HELPER FUNCTIONS ---

// Simulate network delay for better UX (spinners)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getMockUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(MOCK_DB_KEY);
    // Initialize with Admin if empty
    if (!stored) {
      const initialUsers = [{
        id: 'admin-1',
        name: 'Admin MotoElite',
        email: 'Mica@motos.com',
        password: 'Mandino',
        role: 'admin' as const,
        favorites: []
      }];
      localStorage.setItem(MOCK_DB_KEY, JSON.stringify(initialUsers));
      return initialUsers;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error("Mock DB Error", e);
    return [];
  }
};

const saveMockUsers = (users: User[]) => {
  try {
    localStorage.setItem(MOCK_DB_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Mock DB Save Error", e);
  }
};

export const db = {
  // --- AUTHENTICATION ---

  login: async (email: string, password: string): Promise<User> => {
    try {
      // 1. Try Backend API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout to switch to local

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401) throw new Error('Credenciales inválidas');
        throw new Error('Error de conexión con servidor');
      }
      return await response.json();

    } catch (error: any) {
      console.warn("Backend unavailable, using Local DB. Reason:", error.message);
      
      // 2. Fallback: Robust Local DB
      await delay(800); // Simulate network processing
      
      const users = getMockUsers();
      // Case insensitive email check
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (user && user.password === password) {
        const { password: _, ...userWithoutPass } = user;
        return userWithoutPass;
      } else {
        throw new Error('Email o contraseña incorrectos.');
      }
    }
  },

  register: async (userPayload: Omit<User, 'id' | 'role'>): Promise<User> => {
    try {
      // 1. Try Backend API
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
        throw new Error(errorData.message || 'Error al registrarse en el servidor');
      }
      return await response.json();

    } catch (error: any) {
      console.warn("Backend unavailable, using Local DB for Register.");
      
      // 2. Fallback: Robust Local DB
      await delay(1000); // Simulate creation time

      const users = getMockUsers();
      
      // Validate duplicate email locally
      if (users.some(u => u.email.toLowerCase() === userPayload.email.toLowerCase())) {
        throw new Error('Este email ya está registrado.');
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: userPayload.name,
        email: userPayload.email,
        password: userPayload.password,
        role: 'customer',
        favorites: []
      };

      users.push(newUser);
      saveMockUsers(users);

      const { password: _, ...userWithoutPass } = newUser;
      return userWithoutPass;
    }
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    try {
      await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      await delay(500);
      console.log(`[LOCAL MOCK] Recovery code sent to console for: ${email}`);
    }
  },

  confirmPasswordReset: async (email: string, code: string, newPassword: string): Promise<void> => {
    try {
      await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });
    } catch (error) {
      // Local Mock Reset
      await delay(800);
      const users = getMockUsers();
      const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
      
      if(idx !== -1) {
          users[idx].password = newPassword;
          saveMockUsers(users);
      } else {
          throw new Error("Usuario no encontrado.");
      }
    }
  },

  // --- FAVORITES (Sync logic) ---

  getFavorites: async (userId: string): Promise<string[]> => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/favorites`);
      if (!response.ok) throw new Error('Network error');
      return await response.json();
    } catch (error) {
      const users = getMockUsers();
      const user = users.find(u => u.id === userId);
      return user?.favorites || [];
    }
  },

  saveFavorites: async (userId: string, favorites: string[]): Promise<void> => {
    try {
      // Save locally first (optimistic UI)
      const users = getMockUsers();
      const idx = users.findIndex(u => u.id === userId);
      if (idx !== -1) {
        users[idx].favorites = favorites;
        saveMockUsers(users);
      }

      // Try server sync silently
      await fetch(`${API_URL}/users/${userId}/favorites`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorites }),
      });
    } catch (error) {
      // Silent fail, local storage is the source of truth when offline
    }
  },

  // --- SESSION (Browser Cache) ---
  
  setSession: (user: User) => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch(e) { console.error("Session Save Error", e); }
  },

  getSession: (): User | null => {
    try {
      const sessionStr = localStorage.getItem(SESSION_KEY);
      return sessionStr ? JSON.parse(sessionStr) : null;
    } catch (e) {
      console.error("Session Read Error", e);
      return null;
    }
  },

  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
  }
};