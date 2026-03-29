import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración necesaria para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'server-data.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper to read data (Safely wrapped for Vercel Serverless Read-Only limits)
let memoryData = null; // Fallback to memory if disk fails

const readData = () => {
  if (memoryData) return memoryData;

  const initialData = {
    users: [
      {
        id: 'admin-1',
        name: 'Admin MotoElite',
        email: 'Mica@motos.com',
        password: 'Mandino',
        role: 'admin',
        favorites: []
      }
    ],
    orders: []
  };

  try {
    if (!fs.existsSync(DATA_FILE)) {
      try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
      } catch (writeErr) {
        console.warn('Filesystem is read-only (expected on Vercel). Falling back to memory DB.');
        memoryData = initialData;
        return initialData;
      }
      return initialData;
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    console.warn('Error reading DB, using initial data in memory.', err);
    memoryData = initialData;
    return initialData;
  }
};

// Helper to write data
const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.warn('Cannot write to disk (Vercel Serverless). Saving to memory only.');
    memoryData = data;
  }
};

// Routes

// 1. Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readData();
  
  const user = db.users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // In a production app, we would return a JWT token here.
    const { password, recoveryCode, recoveryExpires, ...userWithoutPass } = user;
    res.json(userWithoutPass);
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// 2. Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const db = readData();

  if (db.users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'El email ya está registrado' });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, 
    role: 'customer',
    favorites: [] // Initialize empty favorites
  };

  db.users.push(newUser);
  writeData(db);

  const { password: _, ...userWithoutPass } = newUser;
  res.status(201).json(userWithoutPass);
});

// 3. Forgot Password (Request Code)
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  const db = readData();
  
  const userIndex = db.users.findIndex(u => u.email === email);
  
  if (userIndex !== -1) {
    // Generate a 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save code to user record (expires in 15 mins)
    db.users[userIndex].recoveryCode = code;
    db.users[userIndex].recoveryExpires = Date.now() + 15 * 60 * 1000; 
    
    writeData(db);

    // LOG TO CONSOLE (SIMULATING EMAIL SERVICE)
    console.log('------------------------------------------------');
    console.log(`🔑 RECUPERACIÓN DE CONTRASEÑA PARA: ${email}`);
    console.log(`📨 CÓDIGO SIMULADO: ${code}`);
    console.log('------------------------------------------------');

    res.json({ message: 'Código enviado (Revisa la consola del servidor)' });
  } else {
    // Security: Don't reveal if user exists, just say sent
    res.json({ message: 'Si el email existe, se envió un código.' });
  }
});

// 4. Reset Password (Verify Code & Set New Password)
app.post('/api/auth/reset-password', (req, res) => {
  const { email, code, newPassword } = req.body;
  const db = readData();

  const userIndex = db.users.findIndex(u => 
    u.email === email && 
    u.recoveryCode === code && 
    u.recoveryExpires > Date.now()
  );

  if (userIndex !== -1) {
    // Update password
    db.users[userIndex].password = newPassword;
    
    // Clear recovery data
    delete db.users[userIndex].recoveryCode;
    delete db.users[userIndex].recoveryExpires;

    writeData(db);
    
    res.json({ message: 'Contraseña actualizada correctamente' });
  } else {
    res.status(400).json({ message: 'Código inválido o expirado' });
  }
});

// 5. Get User Favorites
app.get('/api/users/:userId/favorites', (req, res) => {
  const { userId } = req.params;
  const db = readData();
  const user = db.users.find(u => u.id === userId);

  if (user) {
    res.json(user.favorites || []);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// 6. Update User Favorites
app.put('/api/users/:userId/favorites', (req, res) => {
  const { userId } = req.params;
  const { favorites } = req.body; // Expecting array of strings
  const db = readData();
  const userIndex = db.users.findIndex(u => u.id === userId);

  if (userIndex !== -1) {
    if (!Array.isArray(favorites)) {
      return res.status(400).json({ message: 'Formato inválido' });
    }
    db.users[userIndex].favorites = favorites;
    writeData(db);
    res.json({ message: 'Favoritos actualizados', favorites: db.users[userIndex].favorites });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});
// --- MERCADO LIBRE INTEGRATION ---
const ML_APP_ID = '6903992046026037';
const ML_CLIENT_SECRET = 'pPyYRkovAZEg2xAYN6rYxCR2y28UrNcf';
let mlToken = null;
let mlTokenExpires = 0;

async function getMLToken() {
  if (mlToken && Date.now() < mlTokenExpires) {
    return mlToken;
  }
  try {
    const response = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: ML_APP_ID,
        client_secret: ML_CLIENT_SECRET
      })
    });
    const data = await response.json();
    if (data.access_token) {
      mlToken = data.access_token;
      mlTokenExpires = Date.now() + (data.expires_in - 300) * 1000;
      return mlToken;
    }
  } catch (error) {
    console.error('Error fetching ML token:', error);
  }
  return null;
}

// 7. Sync Stock from Mercado Libre
app.post('/api/products/sync-stock', async (req, res) => {
  try {
    const { products } = req.body;
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Formato inválido' });
    }

    const token = await getMLToken();
    if (!token) {
      console.error('Failed to get ML Token');
      return res.json({ products });
    }

    // We also need the user_id that comes with the ML token. 
    // Wait, getMLToken doesn't return user_id. Let's modify it inline or get it.
    // Since getMLToken only returns token, we can get user_id by parsing the token or calling users/me.
    // Actually, client_credentials token always returns user_id when you POST /oauth/token.
    // Since we need user_id, let's fetch it if not cached. 
    // To not break existing getMLToken, we just do a fetch to users/me with the token.
    const meRes = await fetch('https://api.mercadolibre.com/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const meData = await meRes.json();
    const userId = meData.id;

    if (!userId) {
       console.error('Failed to get ML User ID');
       return res.json({ products });
    }

    let allMlItemIds = [];
    let offset = 0;

    // Fetch up to 500 items to avoid infinite loops
    while (offset < 500) {
      const searchRes = await fetch(`https://api.mercadolibre.com/users/${userId}/items/search?limit=100&offset=${offset}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const searchData = await searchRes.json();
      if (!searchData || !searchData.results || searchData.results.length === 0) break;
      allMlItemIds = allMlItemIds.concat(searchData.results);
      if (searchData.results.length < 100) break; // Reached the end
      offset += 100;
    }

    const mapTitleToStock = {};
    const chunkSize = 20;

    for (let i = 0; i < allMlItemIds.length; i += chunkSize) {
      const chunk = allMlItemIds.slice(i, i + chunkSize);
      const url = `https://api.mercadolibre.com/items?ids=${chunk.join(',')}`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      data.forEach(itemInfo => {
        if (itemInfo.code === 200 && itemInfo.body) {
          const body = itemInfo.body;
          const title = (body.title || '').trim().toLowerCase();
          const stock = body.available_quantity;
          
          if (mapTitleToStock[title] === undefined || stock > mapTitleToStock[title]) {
             mapTitleToStock[title] = stock;
          }
        }
      });
    }

    // Apply updates
    const updatedProducts = products.map(p => {
      const pTitle = (p.name || '').trim().toLowerCase();
      // Relaxed matching: check if ML title includes our product name or vice-versa
      // Sometimes ML titles have extra words. But exact match is safest first.
      let newStock = mapTitleToStock[pTitle];
      
      // If exact match fails, try finding an ML item that contains the our exact title
      if (newStock === undefined) {
         for (const [mlTitle, stock] of Object.entries(mapTitleToStock)) {
            if (mlTitle === pTitle || mlTitle.includes(pTitle) || pTitle.includes(mlTitle)) {
               newStock = stock;
               break;
            }
         }
      }

      if (newStock !== undefined) {
        return { ...p, stock: newStock };
      }
      return { ...p, stock: 0 }; // If not found in ML, mark as out of stock or just original? 
      // Better to return 0 or original? The user says "el stock no figura". They want real ML stock. If ML deleted it, stock is 0.
    });

    res.json({ products: updatedProducts });

  } catch (error) {
    console.error('Error syncing stock:', error);
    res.json({ products: req.body.products || [] });
  }
});

// --- SERVE STATIC FRONTEND (Optional: if built via npm run build) ---
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for SPA routing if accessing via Node server
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
     const indexPath = path.join(__dirname, 'dist', 'index.html');
     if (fs.existsSync(indexPath)) {
       res.sendFile(indexPath);
     } else {
       res.status(200).send(`
         <div style="font-family:sans-serif; text-align:center; padding:50px;">
           <h1>Server Running (API Port ${PORT})</h1>
           <p>To see the app, please keep this running and open a new terminal to run: <b>npm run dev</b></p>
         </div>
       `);
     }
  }
});

// Start Server only if not running in a Vercel serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ Backend Server running at http://localhost:${PORT}`);
    console.log(`👤 Admin Account: Mica@motos.com / Mandino`);
    console.log(`ℹ️  Note: Frontend runs separately via "npm run dev"`);
  });
}

// Export for Vercel Serverless
export default app;