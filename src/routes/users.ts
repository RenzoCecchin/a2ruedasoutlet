import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { User } from '../models/User';

const router = Router();

router.get('/:userId/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('favorites');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ favorites: user.favorites });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:userId/favorites', authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (req.userId !== req.params.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso' });
    }

    const { favorites } = req.body;
    if (!Array.isArray(favorites)) {
      return res.status(400).json({ error: 'Favorites debe ser un array' });
    }

    const user = await User.findByIdAndUpdate(req.params.userId, { favorites }, { new: true });
    res.json({ favorites: user?.favorites });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/me', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { ...(name && { name }) },
      { new: true }
    ).select('-passwordHash');

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
