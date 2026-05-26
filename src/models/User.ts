import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'customer';
  favorites: string[];
  isVerified: boolean;
  verificationToken?: string;
  verificationExpires?: Date;
  resetTokenHash?: string;
  resetTokenExpires?: Date;
  loginAttempts?: number;
  lockUntil?: Date;
  createdAt: Date;
  updatedAt: Date;

  // Métodos
  comparePassword(password: string): Promise<boolean>;
  generateVerificationToken(): string;
  generateResetToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    favorites: { type: [String], default: [] },

    // Email verification
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationExpires: Date,

    // Password reset
    resetTokenHash: String,
    resetTokenExpires: Date,

    // Rate limiting
    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
  },
  {
    timestamps: true,
  }
);

// Hash de contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.passwordHash);
};

// Método para generar token de verificación
userSchema.methods.generateVerificationToken = function () {
  const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
  this.verificationToken = token;
  this.verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
  return token;
};

// Método para generar token de reset de contraseña
userSchema.methods.generateResetToken = function () {
  const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
  const crypto = require('crypto');
  this.resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
  this.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
  return token;
};

// Índices para performance
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

export const User = mongoose.model<IUser>('User', userSchema);
