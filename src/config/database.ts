import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log('✓ MongoDB ya conectada');
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI no está definida en .env');
    }

    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('✓ Conectada a MongoDB');
  } catch (error) {
    console.error('✗ Error conectando a MongoDB:', error);
    throw error;
  }
}

export async function disconnectDB() {
  if (!isConnected) return;

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('✓ Desconectada de MongoDB');
  } catch (error) {
    console.error('✗ Error desconectando de MongoDB:', error);
    throw error;
  }
}
