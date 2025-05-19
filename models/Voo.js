import mongoose from 'mongoose';

const vooSchema = new mongoose.Schema({
  numeroVoo: { type: String, required: true, trim: true },
  origem: { type: String, required: true, trim: true },
  destino: { type: String, required: true, trim: true },
  dataHoraPartida: { type: Date, required: true },
  portaoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Portao', required: true },
  status: {
    type: String,
    enum: ['programado', 'embarque', 'concluído'],
    default: 'programado'
  }
}, { timestamps: true });

export default mongoose.model('Voo', vooSchema);
