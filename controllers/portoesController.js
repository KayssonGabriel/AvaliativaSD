import Portao from '../models/Portao.js';
import { validarPortao } from '../validators/portaoValidator.js';

export const criarPortao = async (req, res) => {
  const erros = validarPortao(req.body);
  if (erros.length) return res.status(400).json({ erros });

  try {
    const { codigo } = req.body;
    if (await Portao.findOne({ codigo })) {
      return res.status(400).json({ erro: 'Código de portão já existe.' });
    }
    const portao = await Portao.create({ codigo });
    res.status(201).json(portao);
  } catch (err) {
    res.status(500).json({ erro: err.message });
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

    if (codigo) portao.codigo = codigo;
    if (disponivel !== undefined) portao.disponivel = disponivel;
    await portao.save();
    res.json(portao);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const excluirPortao = async (req, res) => {
  const { id } = req.params;
  try {
    const p = await Portao.findByIdAndDelete(id);
    if (!p) return res.status(404).json({ erro: 'Portão não encontrado.' });
    res.json({ mensagem: 'Portão excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
