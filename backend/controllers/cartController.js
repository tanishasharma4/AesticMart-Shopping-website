import User from '../models/User.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    if (getDBStatus()) {
      const user = await User.findById(req.user._id).populate('cart.product');
      return res.json(user.cart || []);
    } else {
      const user = req.inMemoryStore.users.find((u) => u._id.toString() === req.user._id.toString());
      return res.json(user ? user.cart || [] : []);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Sync user cart from frontend local state
// @route   POST /api/cart/sync
// @access  Private
export const syncCart = async (req, res) => {
  const { cartItems } = req.body;

  try {
    if (getDBStatus()) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.cart = cartItems.map((item) => ({
          product: item.product._id || item.product,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        }));
        await user.save();
        return res.json({ message: 'Cart synced successfully', cart: user.cart });
      }
    } else {
      const user = req.inMemoryStore.users.find((u) => u._id.toString() === req.user._id.toString());
      if (user) {
        user.cart = cartItems;
        return res.json({ message: 'Cart synced successfully', cart: user.cart });
      }
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
