import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

// ============================================
// DATABASE CONNECTION
// ============================================
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn('MONGODB_URI not set, skipping DB connection');
    return;
  }
  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('✓ Connected to MongoDB');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error);
  }
}

// ============================================
// MODELS
// ============================================
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    favorites: { type: [String], default: [] },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationExpires: Date,
    resetTokenHash: String,
    resetTokenExpires: Date,
    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.generateResetToken = function () {
  const crypto = await import('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  this.resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
  this.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
  return token;
};

userSchema.index({ email: 1 });

const User = mongoose.models.User || mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [
      {
        productId: String,
        title: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    totalAmount: Number,
    customerMessage: String,
  },
  { timestamps: true }
);

orderSchema.index({ userId: 1, createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

// ============================================
// MIDDLEWARE
// ============================================
function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not configured');

    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

function adminMiddleware(req, res, next) {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Solo administradores pueden acceder' });
  }
  next();
}

// ============================================
// VALIDATION
// ============================================
const authValidation = {
  register: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }),
  resetPassword: Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
  }),
  verifyEmail: Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
  }),
};

function validateRequest(schema, data) {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const details = error.details.map((d) => d.message).join(', ');
    throw new Error(`Validación fallida: ${details}`);
  }
  return value;
}

// ============================================
// AUTH HELPERS
// ============================================
function generateToken(userId, role) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');
  return jwt.sign({ userId, role }, secret, { expiresIn: '15m' });
}

function generateRefreshToken(userId) {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error('JWT_REFRESH_SECRET not configured');
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}

// ============================================
// EMAIL (SendGrid)
// ============================================
async function sendEmail(to, subject, html) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || 'noreply@a2ruedas.com';
  const emailFromName = process.env.EMAIL_FROM_NAME || 'A2 Ruedas Outlet';

  if (!apiKey) {
    console.log(`📧 EMAIL (dev mode): To: ${to}, Subject: ${subject}`);
    return;
  }

  try {
    const sgMail = (await import('@sendgrid/mail')).default;
    sgMail.setApiKey(apiKey);
    await sgMail.send({ to, from: { email: emailFrom, name: emailFromName }, subject, html });
    console.log(`✓ Email sent to ${to}`);
  } catch (error) {
    console.error('✗ Email error:', error);
  }
}

// ============================================
// EXPRESS APP
// ============================================
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(bodyParser.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================
// AUTH ROUTES
// ============================================
app.post('/api/auth/register', async (req, res) => {
  try {
    await connectDB();
    const data = validateRequest(authValidation.register, req.body);
    
    const existingUser = await User.findOne({ email: data.email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const crypto = await import('crypto');
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = new User({
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash: data.password,
      role: 'customer',
      verificationToken,
      verificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await user.save();

    const verifyUrl = `${process.env.FRONTEND_URL || ''}/verify-email?token=${verificationToken}&email=${data.email}`;
    await sendEmail(
      data.email,
      'Verifica tu email - A2 Ruedas Outlet',
      `<h2>¡Bienvenido a A2 Ruedas Outlet!</h2>
       <p>Para completar tu registro, verifica tu email:</p>
       <a href="${verifyUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verificar Email</a>`
    );

    res.status(201).json({ id: user._id, email: user.email, name: user.name, message: 'Usuario registrado. Verifica tu email.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/verify-email', async (req, res) => {
  try {
    await connectDB();
    const data = validateRequest(authValidation.verifyEmail, req.body);
    const user = await User.findOne({
      email: data.email.toLowerCase(),
      verificationToken: data.token,
      verificationExpires: { $gt: new Date() },
    });
    if (!user) return res.status(400).json({ error: 'Token inválido o expirado' });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();
    res.json({ message: 'Email verificado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    await connectDB();
    const data = validateRequest(authValidation.login, req.body);
    const user = await User.findOne({ email: data.email.toLowerCase() });

    if (!user) return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    if (!user.isVerified) return res.status(401).json({ error: 'Verifica tu email antes de hacer login' });

    if (user.lockUntil && user.lockUntil > new Date()) {
      return res.status(401).json({ error: 'Demasiados intentos. Intenta más tarde.' });
    }

    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;
      if (user.loginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }
      await user.save();
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    const token = generateToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    res.json({
      token,
      refreshToken,
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.post('/api/auth/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token requerido' });

    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) throw new Error('JWT_REFRESH_SECRET not configured');

    const decoded = jwt.verify(refreshToken, secret);
    const token = generateToken(decoded.userId, decoded.role);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    await connectDB();
    const data = validateRequest(authValidation.forgotPassword, req.body);
    const user = await User.findOne({ email: data.email.toLowerCase() });

    const genericMessage = 'Si el email está registrado, recibirás instrucciones para resetear tu contraseña';
    if (!user) return res.json({ message: genericMessage });

    const crypto = await import('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    user.resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL || ''}/reset-password?token=${token}&email=${data.email}`;
    await sendEmail(
      data.email,
      'Resetea tu contraseña - A2 Ruedas Outlet',
      `<h2>Solicitud de Reseteo de Contraseña</h2>
       <p>Haz clic en el botón para crear una nueva contraseña:</p>
       <a href="${resetUrl}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Resetear Contraseña</a>
       <p style="color: #666; font-size: 12px;">Este link expira en 1 hora.</p>`
    );

    res.json({ message: genericMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    await connectDB();
    const data = validateRequest(authValidation.resetPassword, req.body);
    const crypto = await import('crypto');
    const tokenHash = crypto.createHash('sha256').update(data.token).digest('hex');

    const user = await User.findOne({
      email: data.email.toLowerCase(),
      resetTokenHash: tokenHash,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) return res.status(400).json({ error: 'Token de reseteo inválido o expirado' });

    user.passwordHash = data.newPassword;
    user.resetTokenHash = undefined;
    user.resetTokenExpires = undefined;
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logout exitoso' });
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    await connectDB();
    const user = await User.findById(req.userId).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// USER ROUTES
// ============================================
app.get('/api/users/:userId/favorites', async (req, res) => {
  try {
    await connectDB();
    const user = await User.findById(req.params.userId).select('favorites');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:userId/favorites', authMiddleware, async (req, res) => {
  try {
    await connectDB();
    if (req.userId !== req.params.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso' });
    }
    const { favorites } = req.body;
    if (!Array.isArray(favorites)) return res.status(400).json({ error: 'Favorites debe ser un array' });

    const user = await User.findByIdAndUpdate(req.params.userId, { favorites }, { new: true });
    res.json({ favorites: user?.favorites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/me', authMiddleware, async (req, res) => {
  try {
    await connectDB();
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { ...(name && { name }) },
      { new: true }
    ).select('-passwordHash');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ORDER ROUTES
// ============================================
app.post('/api/orders', authMiddleware, async (req, res) => {
  try {
    await connectDB();
    const { items, totalAmount, customerMessage } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items es requerido' });
    }
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ error: 'Total Amount debe ser mayor a 0' });
    }

    const order = new Order({
      userId: req.userId,
      items,
      totalAmount,
      customerMessage: customerMessage || '',
      status: 'pending',
    });
    await order.save();

    const populatedOrder = await Order.findById(order._id).populate('userId', 'name email');
    res.status(201).json({ message: 'Orden creada exitosamente', order: populatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/me', authMiddleware, async (req, res) => {
  try {
    await connectDB();
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/admin/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await connectDB();
    const { status, limit = 50, offset = 0 } = req.query;
    let query = {};
    if (status) query.status = status;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(offset))
      .populate('userId', 'name email');
    const total = await Order.countDocuments(query);
    res.json({ orders, total, limit: Number(limit), offset: Number(offset) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/:orderId', authMiddleware, async (req, res) => {
  try {
    await connectDB();
    const order = await Order.findById(req.params.orderId).populate('userId', 'name email');
    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
    if (order.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso' });
    }
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:orderId/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await connectDB();
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    const order = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true }).populate('userId', 'name email');
    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
    res.json({ message: 'Orden actualizada', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/orders/:orderId', authMiddleware, async (req, res) => {
  try {
    await connectDB();
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
    if (order.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso' });
    }
    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'No se puede cancelar una orden procesada' });
    }
    order.status = 'cancelled';
    await order.save();
    res.json({ message: 'Orden cancelada', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// MERCADO LIBRE STOCK SYNC
// ============================================
const ML_APP_ID = process.env.ML_APP_ID;
const ML_CLIENT_SECRET = process.env.ML_CLIENT_SECRET;
let mlToken = null;
let mlTokenExpires = 0;

async function getMLToken() {
  if (mlToken && Date.now() < mlTokenExpires) return mlToken;
  if (!ML_APP_ID || !ML_CLIENT_SECRET) return null;
  try {
    const response = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
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

const normalizeString = (str) =>
  (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

app.post('/api/products/sync-stock', async (req, res) => {
  try {
    const { products } = req.body;
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Formato inválido' });
    }

    const token = await getMLToken();
    if (!token) return res.json({ products });

    const meRes = await fetch('https://api.mercadolibre.com/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const meData = await meRes.json();
    const userId = meData.id;
    if (!userId) return res.json({ products });

    let allMlItemIds = [];
    let offset = 0;

    while (offset < 2000) {
      const searchRes = await fetch(
        `https://api.mercadolibre.com/users/${userId}/items/search?limit=100&offset=${offset}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const searchData = await searchRes.json();
      if (!searchData?.results?.length) break;
      allMlItemIds = allMlItemIds.concat(searchData.results);
      if (searchData.results.length < 100) break;
      if (searchData.paging && offset + 100 >= searchData.paging.total) break;
      offset += 100;
    }

    const mapTitleToStock = {};
    const chunkSize = 50;
    const chunkPromises = [];

    for (let i = 0; i < allMlItemIds.length; i += chunkSize) {
      const chunk = allMlItemIds.slice(i, i + chunkSize);
      const url = `https://api.mercadolibre.com/items?ids=${chunk.join(',')}`;
      chunkPromises.push(
        fetch(url, { headers: { Authorization: `Bearer ${token}` } })
          .then((r) => r.json())
          .catch(() => [])
      );
    }

    const responses = await Promise.all(chunkPromises);
    responses.forEach((data) => {
      if (Array.isArray(data)) {
        data.forEach((itemInfo) => {
          if (itemInfo.code === 200 && itemInfo.body) {
            const titleNormal = normalizeString(itemInfo.body.title);
            const stock = itemInfo.body.available_quantity;
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
          pWords.forEach((pw) => { if (mlWords.includes(pw)) intersectCount++; });
          const maxLen = Math.max(pWords.length, mlWords.length);
          const score = maxLen === 0 ? 0 : intersectCount / maxLen;
          if (score > 0.65 && score > bestMatchScore) {
            bestMatchScore = score;
            newStock = stock;
          }
        }
      }

      return newStock !== undefined ? { ...p, stock: newStock } : { ...p, stock: p.stock };
    });

    res.json({ products: updatedProducts });
  } catch (error) {
    console.error('Error syncing stock:', error);
    res.json({ products: req.body.products || [] });
  }
});

export default app;
