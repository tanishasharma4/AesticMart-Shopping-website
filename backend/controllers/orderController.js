import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { getDBStatus } from '../config/db.js';

// Helper to generate a unique aesthetic order number
const generateOrderNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'AST-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (Guest or Authenticated)
export const createOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    subtotal,
    taxPrice,
    shippingPrice,
    discountPrice,
    totalPrice,
    guestEmail,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No items in order' });
  }

  if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street) {
    return res.status(400).json({ message: 'Shipping address is incomplete' });
  }

  try {
    const orderNumber = generateOrderNumber();

    if (getDBStatus()) {
      const order = new Order({
        orderNumber,
        user: req.user ? req.user._id : undefined,
        guestEmail: guestEmail || (req.user ? req.user.email : 'guest@aesticmart.com'),
        orderItems: orderItems.map((item) => ({
          product: item.product._id || item._id,
          name: item.name,
          image: item.images ? item.images[0] : item.image,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize || item.sizes?.[0] || 'Standard',
          selectedColor: item.selectedColor || item.colors?.[0]?.name || 'Standard',
        })),
        shippingAddress,
        paymentMethod: paymentMethod || 'Credit Card',
        paymentResult: {
          id: 'pay_' + Math.random().toString(36).substring(2, 10),
          status: 'COMPLETED',
          updateTime: new Date().toISOString(),
        },
        subtotal,
        taxPrice: taxPrice || 0,
        shippingPrice: shippingPrice || 0,
        discountPrice: discountPrice || 0,
        totalPrice,
        isPaid: true,
        paidAt: new Date(),
        orderStatus: 'Processing',
        estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // +4 days
      });

      const createdOrder = await order.save();

      // Optionally decrement product stock
      for (const item of orderItems) {
        const prodId = item.product._id || item._id;
        await Product.findByIdAndUpdate(prodId, { $inc: { stockCount: -item.quantity } });
      }

      return res.status(201).json(createdOrder);
    } else {
      // In-memory order creation
      const createdOrder = {
        _id: 'ord_' + Date.now(),
        orderNumber,
        user: req.user ? req.user._id : undefined,
        guestEmail: guestEmail || (req.user ? req.user.email : 'guest@aesticmart.com'),
        orderItems,
        shippingAddress,
        paymentMethod: paymentMethod || 'Credit Card',
        paymentResult: {
          id: 'pay_' + Math.random().toString(36).substring(2, 10),
          status: 'COMPLETED',
          updateTime: new Date().toISOString(),
        },
        subtotal,
        taxPrice,
        shippingPrice,
        discountPrice,
        totalPrice,
        isPaid: true,
        paidAt: new Date().toISOString(),
        orderStatus: 'Processing',
        estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      };

      req.inMemoryStore.orders.unshift(createdOrder);
      return res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    if (getDBStatus()) {
      const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
      return res.json(orders);
    } else {
      const userOrders = req.inMemoryStore.orders.filter(
        (o) => o.user && o.user.toString() === req.user._id.toString()
      );
      return res.json(userOrders);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
  try {
    if (getDBStatus()) {
      const order = await Order.findById(req.params.id).populate('user', 'name email');
      if (order) return res.json(order);
      return res.status(404).json({ message: 'Order not found' });
    } else {
      const order = req.inMemoryStore.orders.find(
        (o) => o._id === req.params.id || o.orderNumber === req.params.id
      );
      if (order) return res.json(order);
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
