import User from '../models/User.js';
import { getDBStatus } from '../config/db.js';

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    if (getDBStatus()) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = req.body.password;
        }
        if (req.body.avatar) {
          user.avatar = req.body.avatar;
        }

        const updatedUser = await user.save();
        return res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          avatar: updatedUser.avatar,
        });
      }
    } else {
      const user = req.inMemoryStore.users.find((u) => u._id.toString() === req.user._id.toString());
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.avatar) user.avatar = req.body.avatar;
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        });
      }
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
