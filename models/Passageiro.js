import mongoose from 'mongoose';
import validator from 'validator';

const passageiroSchema = new mongoose.Schema({
  nome: String,
  cpf: {
    type: String,
    unique: true,
    validate: (value) => validator.isLength(value, { min: 11, max: 11 })
  },
  vooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Voo' },
  statusCheckin: {
    type: String,
    enum: ['pendente', 'realizado'],
    default: 'pendente'
  }
});

export default mongoose.model('Passageiro', passageiroSchema);
