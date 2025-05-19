import Voo from '../models/Voo.js';
import Portao from '../models/Portao.js';
import { validarVoo } from '../validators/vooValidator.js';

export const criarVoo = async (req, res) => {
  const erros = validarVoo(req.body);
  if (erros.length) return res.status(400).json({ erros });

  const { numeroVoo, origem, destino, dataHoraPartida, portaoId } = req.body;
  try {
    const portao = await Portao.findById(portaoId);
    if (!portao || !portao.disponivel) {
      return res.status(400).json({ erro: 'Portão indisponível ou inexistente.' });
    }

    const voo = await Voo.create({ numeroVoo, origem, destino, dataHoraPartida, portaoId });
    portao.disponivel = false;
    await portao.save();

    res.status(201).json(voo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const listarVoos = async (req, res) => {
  const voos = await Voo.find().populate('portaoId');
  res.json(voos);
};

export const atualizarVoo = async (req, res) => {
  const { id } = req.params;
  const { numeroVoo, origem, destino, dataHoraPartida, portaoId, status } = req.body;

  try {
    const voo = await Voo.findById(id).populate('portaoId');
    if (!voo) return res.status(404).json({ erro: 'Voo não encontrado.' });

    // trocar portão: libera o antigo e ocupa o novo
    if (portaoId && portaoId !== voo.portaoId?._id.toString()) {
      const novo = await Portao.findById(portaoId);
      if (!novo || !novo.disponivel) {
        return res.status(400).json({ erro: 'Portão indisponível ou inexistente.' });
      }
      voo.portaoId.disponivel = true;
      await voo.portaoId.save();
      novo.disponivel = false;
      await novo.save();
      voo.portaoId = portaoId;
    }

    if (numeroVoo) voo.numeroVoo = numeroVoo;
    if (origem) voo.origem = origem;
    if (destino) voo.destino = destino;
    if (dataHoraPartida) voo.dataHoraPartida = dataHoraPartida;

    // ao mudar status, se for "concluído", libera portão
    if (status && status !== voo.status) {
      voo.status = status;
      if (status === 'concluído' && voo.portaoId) {
        const p = await Portao.findById(voo.portaoId);
        p.disponivel = true;
        await p.save();
      }
    }

    await voo.save();
    res.json(voo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarStatusVoo = async (req, res) => {
  const { id } = req.params;
  const { novoStatus } = req.body;

  try {
    const voo = await Voo.findById(id).populate('portaoId');
    if (!voo) return res.status(404).json({ erro: 'Voo não encontrado.' });

    voo.status = novoStatus;
    if (novoStatus === 'concluído' && voo.portaoId) {
      const p = await Portao.findById(voo.portaoId._id);
      p.disponivel = true;
      await p.save();
    }
    await voo.save();
    res.json(voo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const excluirVoo = async (req, res) => {
  const { id } = req.params;
  try {
    const voo = await Voo.findByIdAndDelete(id);
    if (!voo) return res.status(404).json({ erro: 'Voo não encontrado.' });

    // libera portão ao excluir voo
    const p = await Portao.findById(voo.portaoId);
    if (p) {
      p.disponivel = true;
      await p.save();
    }
    res.json({ mensagem: 'Voo excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
