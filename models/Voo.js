import mongoose from 'mongoose';

const vooSchema = new mongoose.Schema({
  numeroVoo: String,
  origem: String,
  destino: String,
  dataHoraPartida: Date,
  portaoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Portao' },
  status: {
    type: String,
    enum: ['programado', 'embarque', 'concluído'],
    default: 'programado'
  }
});

export default mongoose.model('Voo', vooSchema);
