import { Router } from 'express';
import { authMiddleware, adminMiddleware, AuthRequest } from '../middleware/auth';
import { Order } from '../models/Order';
import { User } from '../models/User';

const router = Router();

// Crear orden (requiere autenticación)
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
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

    // Poblar información del usuario
    const populatedOrder = await Order.findById(order._id).populate('userId', 'name email');

    res.status(201).json({
      message: 'Orden creada exitosamente',
      order: populatedOrder,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener mis órdenes
router.get('/me', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');

    res.json({ orders });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las órdenes (solo admin)
router.get('/admin/all', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    let query: any = {};
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(offset))
      .populate('userId', 'name email');

    const total = await Order.countDocuments(query);

    res.json({ orders, total, limit: Number(limit), offset: Number(offset) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener detalle de orden
router.get('/:orderId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    // Verificar permisos: el usuario es el dueño o es admin
    if (order.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso para acceder esta orden' });
    }

    res.json({ order });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar status de orden (solo admin)
router.put('/:orderId/status', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    ).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    res.json({ message: 'Orden actualizada', order });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Cancelar orden (usuario puede cancelar sus propias órdenes)
router.delete('/:orderId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    // Verificar permisos
    if (order.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso para cancelar esta orden' });
    }

    // Solo se pueden cancelar órdenes en estado pending
    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'No se puede cancelar una orden que ya fue procesada' });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({ message: 'Orden cancelada', order });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
