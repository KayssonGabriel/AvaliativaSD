import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async function conectarBanco() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Erro ao conectar MongoDB:', err);
  }
}
