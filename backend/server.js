import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { connectDB, getDBStatus } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { seedProducts, seedCategories } from './seeders/seedData.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Initialize In-Memory Store for zero-config fallback
const inMemoryStore = {
  products: seedProducts.map((p, idx) => ({ ...p, _id: 'prod_' + (idx + 1) })),
  categories: seedCategories,
  users: [
    {
      _id: 'usr_admin',
      name: 'Aestic Admin',
      email: 'admin@aesticmart.com',
      password: 'adminpassword123',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      cart: [],
      wishlist: [],
    },
    {
      _id: 'usr_demo',
      name: 'Alex Rivera',
      email: 'alex@aesticmart.com',
      password: 'password123',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      cart: [],
      wishlist: [],
    }
  ],
  orders: [],
};

// Middleware
app.use(cors());
app.use(express.json());

// Attach inMemoryStore to requests for fallback use
app.use((req, res, next) => {
  req.inMemoryStore = inMemoryStore;
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'AesticMart',
    dbConnected: getDBStatus(),
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

// Centralized error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect DB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✨ [AesticMart Server] Running on http://localhost:${PORT}`);
  });
});
