import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import * as authService from '../services/authService';
import { validateRequest, authValidation } from '../utils/validation';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const data = validateRequest(authValidation.register, req.body);
    const result = await authService.registerUser(data.name, data.email, data.password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/verify-email', async (req, res) => {
  try {
    const data = validateRequest(authValidation.verifyEmail, req.body);
    const result = await authService.verifyEmail(data.email, data.token);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const data = validateRequest(authValidation.login, req.body);
    const result = await authService.loginUser(data.email, data.password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new Error('Refresh token requerido');
    }
    const token = authService.refreshAccessToken(refreshToken);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const data = validateRequest(authValidation.forgotPassword, req.body);
    const result = await authService.forgotPassword(data.email);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const data = validateRequest(authValidation.resetPassword, req.body);
    const result = await authService.resetPassword(data.email, data.token, data.newPassword);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/logout', authMiddleware, async (req: AuthRequest, res: Response) => {
  // Los tokens JWT no requieren logout del lado del servidor
  // El logout se maneja en el cliente borrando el token
  res.json({ message: 'Logout exitoso' });
});

router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { User } = await import('../models/User');
    const user = await User.findById(req.userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
