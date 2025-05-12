import Passageiro from '../models/Passageiro.js';
import Voo from '../models/Voo.js';
import { validarPassageiro } from '../validators/passageiroValidator.js';

export const criarPassageiro = async (req, res) => {
  try {
    const erros = validarPassageiro(req.body);
    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const { nome, cpf, vooId } = req.body;

    // Verificar se o CPF já existe
    const cpfExistente = await Passageiro.findOne({ cpf });
    if (cpfExistente) {
      return res.status(400).json({ erro: 'CPF já cadastrado.' });
    }

    const voo = await Voo.findById(vooId);
    if (!voo) return res.status(404).json({ erro: 'Voo não encontrado.' });

    const passageiro = await Passageiro.create({ nome, cpf, vooId });
    res.status(201).json(passageiro);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const listarPassageiros = async (req, res) => {
  const passageiros = await Passageiro.find().populate('vooId');
  res.json(passageiros);
};

export const atualizarCheckin = async (req, res) => {
  const { id } = req.params;

  const passageiro = await Passageiro.findById(id).populate('vooId');
  if (!passageiro) return res.status(404).json({ erro: 'Passageiro não encontrado.' });

  if (passageiro.vooId.status !== 'embarque') {
    return res.status(400).json({ erro: 'Voo ainda não está em embarque.' });
  }

  passageiro.statusCheckin = 'realizado';
  await passageiro.save();
  res.json(passageiro);
};

export const atualizarPassageiro = async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, vooId } = req.body;

  try {
    const passageiro = await Passageiro.findById(id);
    if (!passageiro) return res.status(404).json({ erro: 'Passageiro não encontrado.' });

    if (cpf) {
      const cpfExistente = await Passageiro.findOne({ cpf, _id: { $ne: id } });
      if (cpfExistente) return res.status(400).json({ erro: 'CPF já cadastrado.' });
    }

    passageiro.nome = nome || passageiro.nome;
    passageiro.cpf = cpf || passageiro.cpf;
    passageiro.vooId = vooId || passageiro.vooId;

    await passageiro.save();
    res.json(passageiro);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const excluirPassageiro = async (req, res) => {
  const { id } = req.params;

  try {
    const passageiro = await Passageiro.findByIdAndDelete(id);
    if (!passageiro) return res.status(404).json({ erro: 'Passageiro não encontrado.' });

    res.json({ mensagem: 'Passageiro excluído com sucesso.' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
