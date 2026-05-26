import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { sendEmail } from '../config/email';
import crypto from 'crypto';

export async function registerUser(name: string, email: string, password: string) {
  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');
  const user = new User({
    name,
    email: email.toLowerCase(),
    passwordHash: password,
    role: 'customer',
    verificationToken,
    verificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  await user.save();

  // Enviar email de verificación
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${email}`;
  await sendEmail(
    email,
    'Verifica tu email - A2 Ruedas Outlet',
    `
    <h2>¡Bienvenido a A2 Ruedas Outlet!</h2>
    <p>Para completar tu registro, verifica tu email haciendo clic en el botón de abajo:</p>
    <a href="${verifyUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
      Verificar Email
    </a>
    <p style="color: #666; font-size: 12px; margin-top: 20px;">O copia este link: ${verifyUrl}</p>
    `
  );

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    message: 'Usuario registrado. Verifica tu email para continuar.',
  };
}

export async function verifyEmail(email: string, token: string) {
  const user = await User.findOne({
    email: email.toLowerCase(),
    verificationToken: token,
    verificationExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new Error('Token de verificación inválido o expirado');
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationExpires = undefined;
  await user.save();

  return { message: 'Email verificado exitosamente' };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new Error('Email o contraseña incorrectos');
  }

  if (!user.isVerified) {
    throw new Error('Verifica tu email antes de hacer login');
  }

  // Check rate limiting
  if (user.lockUntil && user.lockUntil > new Date()) {
    throw new Error('Demasiados intentos fallidos. Intenta de nuevo más tarde.');
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    user.loginAttempts = (user.loginAttempts || 0) + 1;
    if (user.loginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
    }
    await user.save();
    throw new Error('Email o contraseña incorrectos');
  }

  // Reset login attempts
  user.loginAttempts = 0;
  user.lockUntil = undefined;
  await user.save();

  const token = generateToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString());

  return {
    token,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}

export async function forgotPassword(email: string) {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    // No revelar si el email existe o no
    return { message: 'Si el email está registrado, recibirás instrucciones para resetear tu contraseña' };
  }

  const resetToken = user.generateResetToken();
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;
  await sendEmail(
    email,
    'Resetea tu contraseña - A2 Ruedas Outlet',
    `
    <h2>Solicitud de Reseteo de Contraseña</h2>
    <p>Recibimos una solicitud para resetear tu contraseña. Haz clic en el botón de abajo para crear una nueva:</p>
    <a href="${resetUrl}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
      Resetear Contraseña
    </a>
    <p style="color: #666; font-size: 12px;">Este link expira en 1 hora.</p>
    <p style="color: #999; font-size: 11px;">Si no solicitaste esto, ignora este email.</p>
    `
  );

  return { message: 'Si el email está registrado, recibirás instrucciones para resetear tu contraseña' };
}

export async function resetPassword(email: string, token: string, newPassword: string) {
  const crypto = require('crypto');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    email: email.toLowerCase(),
    resetTokenHash: tokenHash,
    resetTokenExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new Error('Token de reseteo inválido o expirado');
  }

  user.passwordHash = newPassword;
  user.resetTokenHash = undefined;
  user.resetTokenExpires = undefined;
  user.loginAttempts = 0;
  user.lockUntil = undefined;
  await user.save();

  return { message: 'Contraseña actualizada exitosamente' };
}

export function generateToken(userId: string, role: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET no configurada');

  return jwt.sign({ userId, role }, secret, { expiresIn: '15m' });
}

export function generateRefreshToken(userId: string) {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error('JWT_REFRESH_SECRET no configurada');

  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}

export function refreshAccessToken(refreshToken: string) {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error('JWT_REFRESH_SECRET no configurada');

  try {
    const decoded = jwt.verify(refreshToken, secret) as any;
    return generateToken(decoded.userId, decoded.role);
  } catch (error) {
    throw new Error('Refresh token inválido o expirado');
  }
}
