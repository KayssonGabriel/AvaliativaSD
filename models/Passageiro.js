import mongoose from 'mongoose';

const passageiroSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  cpf: { type: String, required: true, unique: true, trim: true },
  vooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Voo', required: true },
  statusCheckin: {
    type: String,
    enum: ['pendente', 'realizado'],
    default: 'pendente'
  }
}, { timestamps: true });

export default mongoose.model('Passageiro', passageiroSchema);
