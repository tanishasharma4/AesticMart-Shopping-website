import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aesticmart';
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500, // Timeout quickly if MongoDB isn't running locally
    });
    isConnected = true;
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Notice] Direct MongoDB connection fallback engaged (${error.message}). Using hybrid in-memory store for instant zero-config startup.`);
    isConnected = false;
    return false;
  }
};

export const getDBStatus = () => isConnected;
