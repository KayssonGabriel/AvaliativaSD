import Voo from '../models/Voo.js';
import Passageiro from '../models/Passageiro.js';

export const gerarRelatorio = async (req, res) => {
  try {
    // Define o intervalo do dia atual
    const hoje = new Date();
    const inicio = new Date(hoje.setHours(0, 0, 0, 0));
    const fim    = new Date(hoje.setHours(23, 59, 59, 999));

    // Busca todos os voos agendados para hoje (independente de status)
    const voos = await Voo.find({
      dataHoraPartida: { $gte: inicio, $lte: fim }
    }).populate('portaoId');

    // Busca todos os passageiros populando vooId para fazer o agrupamento
    const passageiros = await Passageiro.find().populate('vooId');

    // Monta o relatório agrupando passageiros por voo
    const relatorio = voos.map(voo => {
      const listaPassageiros = passageiros
        .filter(p => p.vooId && p.vooId._id.equals(voo._id))
        .map(p => ({
          nome: p.nome,
          cpf: p.cpf,
          checkin: p.statusCheckin
        }));

      return {
        numeroVoo: voo.numeroVoo,
        origem: voo.origem,
        destino: voo.destino,
        dataHoraPartida: voo.dataHoraPartida,
        portao: voo.portaoId?.codigo || 'não atribuído',
        passageiros: listaPassageiros
      };
    });

    res.json(relatorio);
  } catch (erro) {
    console.error('Erro ao gerar relatório:', erro);
    res.status(500).json({ erro: 'Erro interno ao gerar relatório.' });
  }
};
