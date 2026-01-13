import { User } from '../types';

const SESSION_KEY = 'a2ruedas_session';
const API_URL = 'http://127.0.0.1:3001/api';

// --- LOCAL STORAGE MOCK HELPER (Fallback) ---
// Used when backend server is offline (e.g., Vercel Demo)
const MOCK_DB_KEY = 'a2ruedas_mock_db_users';

const getMockUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(MOCK_DB_KEY);
    return stored ? JSON.parse(stored) : [];
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
  // --- API CALLS (Server Side with Fallback) ---

  login: async (email: string, password: string): Promise<User> => {
    try {
      // Try fetch first
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Only throw if it's a real server error (401), not a connection error
        if (response.status === 401) throw new Error('Credenciales inválidas');
        // If 404 or other, assume network issue and fall through to catch
        if (response.status !== 404) throw new Error('Error de servidor');
      }
      return await response.json();

    } catch (error: any) {
      console.warn("Backend unreached, trying Local Mock...", error);
      
      // FALLBACK: LocalStorage Mock
      const users = getMockUsers();
      // Add default admin if not exists in mock
      if (!users.some(u => u.email === 'Mica@motos.com')) {
         users.push({ id: 'admin-1', name: 'Admin MotoElite', email: 'Mica@motos.com', password: 'Mandino', role: 'admin', favorites: [] });
         saveMockUsers(users);
      }

      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        const { password: _, ...userWithoutPass } = user;
        return userWithoutPass;
      } else {
        throw new Error('Credenciales inválidas (Modo Demo)');
      }
    }
  },

  register: async (userPayload: Omit<User, 'id' | 'role'>): Promise<User> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload),
      });

      if (!response.ok) throw new Error('Error al registrarse');
      return await response.json();

    } catch (error: any) {
      console.warn("Backend unreached, using Local Mock for Register");
      
      // FALLBACK: LocalStorage Mock
      const users = getMockUsers();
      if (users.some(u => u.email === userPayload.email)) {
        throw new Error('El email ya está registrado (Modo Demo)');
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
      console.log("Mock Forgot Password: Code sent to console (F12)");
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
        // Fallback Mock Logic
        const users = getMockUsers();
        const idx = users.findIndex(u => u.email === email);
        if(idx !== -1) {
            users[idx].password = newPassword;
            saveMockUsers(users);
        } else {
            throw new Error("Usuario no encontrado (Modo Demo)");
        }
    }
  },

  // --- FAVORITES (Server Side with Fallback) ---

  getFavorites: async (userId: string): Promise<string[]> => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/favorites`);
      if (!response.ok) throw new Error('Failed to fetch');
      return await response.json();
    } catch (error) {
      // Fallback
      const users = getMockUsers();
      const user = users.find(u => u.id === userId);
      return user?.favorites || [];
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
      // Fallback
      const users = getMockUsers();
      const idx = users.findIndex(u => u.id === userId);
      if (idx !== -1) {
        users[idx].favorites = favorites;
        saveMockUsers(users);
      }
    }
  },

  // --- SESSION MANAGEMENT (Client Side) ---
  
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