import express from 'express';
import { createOrder, getMyOrders, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/mine', protect, getMyOrders);
router.get('/:id', getOrderById);

export default router;
