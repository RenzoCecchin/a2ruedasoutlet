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

// Helper to read data
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    // Initialize with default admin if file doesn't exist
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
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
};

// Helper to write data
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
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

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Backend Server running at http://localhost:${PORT}`);
  console.log(`👤 Admin Account: Mica@motos.com / Mandino`);
  console.log(`ℹ️  Note: Frontend runs separately via "npm run dev"`);
});