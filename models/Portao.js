import mongoose from 'mongoose';

const portaoSchema = new mongoose.Schema({
  codigo: String,
  disponivel: { type: Boolean, default: true }
});

export default mongoose.model('Portao', portaoSchema);
