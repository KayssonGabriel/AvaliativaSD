import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const conectarBanco = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Erro ao conectar MongoDB:', err);
  }
};

export default conectarBanco;
