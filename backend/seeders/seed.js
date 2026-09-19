import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { seedProducts, seedCategories } from './seedData.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    const isConnected = await connectDB();
    
    if (isConnected) {
      console.log('Clearing existing database collections...');
      await User.deleteMany();
      await Product.deleteMany();
      await Category.deleteMany();

      console.log('Seeding categories...');
      await Category.insertMany(seedCategories);

      console.log('Seeding products...');
      await Product.insertMany(seedProducts);

      console.log('Seeding demo users...');
      const adminUser = await User.create({
        name: 'Aestic Admin',
        email: 'admin@aesticmart.com',
        password: 'adminpassword123',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      });

      const demoCustomer = await User.create({
        name: 'Alex Rivera',
        email: 'alex@aesticmart.com',
        password: 'password123',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      });

      console.log(`[Seed Complete] Admin: ${adminUser.email}, Demo Customer: ${demoCustomer.email}`);
    } else {
      console.log('[Seed Info] Database seed template loaded into hybrid memory mode.');
    }
  } catch (error) {
    console.error('Seeding Error:', error);
  }
};

// If run directly from command line
if (process.argv[2] === '-d' || process.argv[2] === '--seed') {
  seedDatabase().then(() => {
    mongoose.connection.close();
    process.exit();
  });
}
