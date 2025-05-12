import Voo from '../models/Voo.js';
import Portao from '../models/Portao.js';
import { validarVoo } from '../validators/vooValidator.js';

export const criarVoo = async (req, res) => {
  try {
    const erros = validarVoo(req.body);
    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const { numeroVoo, origem, destino, dataHoraPartida, portaoId } = req.body;

    const portao = await Portao.findById(portaoId);
    if (!portao || !portao.disponivel) {
      return res.status(400).json({ erro: 'Portão indisponível ou inexistente.' });
    }

    const voo = await Voo.create({ numeroVoo, origem, destino, dataHoraPartida, portaoId });

    portao.disponivel = false;
    await portao.save();

    res.status(201).json(voo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const listarVoos = async (req, res) => {
  const voos = await Voo.find().populate('portaoId');
  res.json(voos);
};

export const atualizarStatusVoo = async (req, res) => {
  const { id } = req.params;
  const { novoStatus } = req.body;

  const voo = await Voo.findById(id).populate('portaoId');
  if (!voo) return res.status(404).json({ erro: 'Voo não encontrado.' });

  voo.status = novoStatus;

  if (novoStatus === 'concluído' && voo.portaoId) {
    const portao = await Portao.findById(voo.portaoId._id);
    portao.disponivel = true;
    await portao.save();
  }

  await voo.save();
  res.json(voo);
};

export const atualizarVoo = async (req, res) => {
  const { id } = req.params;
  const { numeroVoo, origem, destino, dataHoraPartida, portaoId, status } = req.body;

  try {
    const voo = await Voo.findById(id);
    if (!voo) return res.status(404).json({ erro: 'Voo não encontrado.' });

    if (portaoId && portaoId !== voo.portaoId.toString()) {
      const novoPortao = await Portao.findById(portaoId);
      if (!novoPortao || !novoPortao.disponivel) {
        return res.status(400).json({ erro: 'Portão indisponível ou inexistente.' });
      }

      const antigoPortao = await Portao.findById(voo.portaoId);
      antigoPortao.disponivel = true;
      await antigoPortao.save();

      novoPortao.disponivel = false;
      await novoPortao.save();

      voo.portaoId = portaoId;
    }

    voo.numeroVoo = numeroVoo || voo.numeroVoo;
    voo.origem = origem || voo.origem;
    voo.destino = destino || voo.destino;
    voo.dataHoraPartida = dataHoraPartida || voo.dataHoraPartida;
    voo.status = status || voo.status;

    await voo.save();
    res.json(voo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const excluirVoo = async (req, res) => {
  const { id } = req.params;

  try {
    const voo = await Voo.findByIdAndDelete(id);
    if (!voo) return res.status(404).json({ erro: 'Voo não encontrado.' });

    const portao = await Portao.findById(voo.portaoId);
    if (portao) {
      portao.disponivel = true;
      await portao.save();
    }

    res.json({ mensagem: 'Voo excluído com sucesso.' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
