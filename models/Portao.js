import mongoose from 'mongoose';

const portaoSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true, trim: true },
  disponivel: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Portao', portaoSchema);
