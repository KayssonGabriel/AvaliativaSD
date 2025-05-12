import express from 'express';
import Voo from './models/Voo.js';
import Passageiro from './models/Passageiro.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const hoje = new Date();
  const inicio = new Date(hoje.setHours(0, 0, 0, 0));
  const fim = new Date(hoje.setHours(23, 59, 59, 999));

  const voos = await Voo.find({
    dataHoraPartida: { $gte: inicio, $lte: fim },
    status: 'programado'
  }).populate('portaoId');

  const passageiros = await Passageiro.find().populate('vooId');

  const relatorio = voos.map(voo => {
    const passageirosDoVoo = passageiros.filter(p => p.vooId._id.equals(voo._id));
    return {
      numeroVoo: voo.numeroVoo,
      origem: voo.origem,
      destino: voo.destino,
      dataHoraPartida: voo.dataHoraPartida,
      portao: voo.portaoId?.codigo || 'não atribuído',
      passageiros: passageirosDoVoo.map(p => ({
        nome: p.nome,
        cpf: p.cpf,
        checkin: p.statusCheckin
      }))
    };
  });

  res.json(relatorio);
});

export default router;
