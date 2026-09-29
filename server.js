import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

import { connectDB } from './src/config/database.ts';
import { initializeEmail } from './src/config/email.ts';
import authRoutes from './src/routes/auth.ts';
import userRoutes from './src/routes/users.ts';
import orderRoutes from './src/routes/orders.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(bodyParser.json());

// Rate limiting para endpoints sensibles
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: 'Demasiados intentos. Intenta de nuevo en 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rutas
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);
app.use('/api/auth/reset-password', authLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Mercado Libre Integration
const ML_APP_ID = process.env.ML_APP_ID || '';
const ML_CLIENT_SECRET = process.env.ML_CLIENT_SECRET || '';
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
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: ML_APP_ID,
        client_secret: ML_CLIENT_SECRET,
      }),
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

    const meRes = await fetch('https://api.mercadolibre.com/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const meData = await meRes.json();
    const userId = meData.id;

    if (!userId) {
      console.error('Failed to get ML User ID');
      return res.json({ products });
    }

    let allMlItemIds = [];
    let offset = 0;

    while (offset < 2000) {
      const searchRes = await fetch(
        `https://api.mercadolibre.com/users/${userId}/items/search?limit=100&offset=${offset}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const searchData = await searchRes.json();
      if (!searchData || !searchData.results || searchData.results.length === 0) break;
      allMlItemIds = allMlItemIds.concat(searchData.results);
      if (searchData.results.length < 100) break;
      if (searchData.paging && offset + 100 >= searchData.paging.total) break;
      offset += 100;
    }

    const mapTitleToStock = {};
    const chunkSize = 50;

    const normalizeString = (str) => {
      return (str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const chunkPromises = [];
    for (let i = 0; i < allMlItemIds.length; i += chunkSize) {
      const chunk = allMlItemIds.slice(i, i + chunkSize);
      const url = `https://api.mercadolibre.com/items?ids=${chunk.join(',')}`;

      const chunkPromise = fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .catch((err) => {
          console.error('Error fetching ML items chunk:', err);
          return [];
        });

      chunkPromises.push(chunkPromise);
    }

    const responses = await Promise.all(chunkPromises);

    responses.forEach((data) => {
      if (Array.isArray(data)) {
        data.forEach((itemInfo) => {
          if (itemInfo.code === 200 && itemInfo.body) {
            const body = itemInfo.body;
            const titleNormal = normalizeString(body.title);
            const stock = body.available_quantity;

            if (mapTitleToStock[titleNormal] === undefined || stock > mapTitleToStock[titleNormal]) {
              mapTitleToStock[titleNormal] = stock;
            }
          }
        });
      }
    });

    const updatedProducts = products.map((p) => {
      const pTitle = normalizeString(p.name);
      let newStock = mapTitleToStock[pTitle];

      if (newStock === undefined) {
        let bestMatchScore = 0;
        const pWords = pTitle.split(/\s+/).filter((w) => w.length > 1);

        for (const [mlTitle, stock] of Object.entries(mapTitleToStock)) {
          const mlWords = mlTitle.split(/\s+/).filter((w) => w.length > 1);

          let intersectCount = 0;
          pWords.forEach((pw) => {
            if (mlWords.includes(pw)) intersectCount++;
          });

          const maxLen = Math.max(pWords.length, mlWords.length);
          const score = maxLen === 0 ? 0 : intersectCount / maxLen;

          if (score > 0.65 && score > bestMatchScore) {
            bestMatchScore = score;
            newStock = stock;
          }
        }
      }

      if (newStock !== undefined) {
        return { ...p, stock: newStock };
      }
      return { ...p, stock: p.stock };
    });

    res.json({ products: updatedProducts });
  } catch (error) {
    console.error('Error syncing stock:', error);
    res.json({ products: req.body.products || [] });
  }
});

// Static files
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    try {
      res.sendFile(indexPath);
    } catch {
      res.status(200).send(`
        <div style="font-family:sans-serif; text-align:center; padding:50px;">
          <h1>A2 Ruedas Server Running</h1>
          <p>API: http://localhost:${PORT}/api</p>
        </div>
      `);
    }
  }
});

// Start server y conectar a BD
async function startServer() {
  try {
    await connectDB();
    initializeEmail();

    if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`✅ Backend running at http://localhost:${PORT}`);
        console.log(`📚 API: http://localhost:${PORT}/api`);
      });
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
