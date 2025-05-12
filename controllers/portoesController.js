import Portao from '../models/Portao.js';
import { validarPortao } from '../validators/portaoValidator.js';

export const criarPortao = async (req, res) => {
  try {
    const erros = validarPortao(req.body);
    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const { codigo } = req.body;
    const portao = await Portao.create({ codigo });
    res.status(201).json(portao);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const listarPortoes = async (req, res) => {
  const portoes = await Portao.find();
  res.json(portoes);
};

export const atualizarPortao = async (req, res) => {
  const { id } = req.params;
  const { codigo, disponivel } = req.body;

  try {
    const portao = await Portao.findById(id);
    if (!portao) return res.status(404).json({ erro: 'Portão não encontrado.' });

    portao.codigo = codigo || portao.codigo;
    if (disponivel !== undefined) {
      portao.disponivel = disponivel;
    }

    await portao.save();
    res.json(portao);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const excluirPortao = async (req, res) => {
  const { id } = req.params;

  try {
    const portao = await Portao.findByIdAndDelete(id);
    if (!portao) return res.status(404).json({ erro: 'Portão não encontrado.' });

    res.json({ mensagem: 'Portão excluído com sucesso.' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
