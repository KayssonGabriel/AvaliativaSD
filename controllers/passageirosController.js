import Passageiro from '../models/Passageiro.js';
import Voo from '../models/Voo.js';
import { validarPassageiro } from '../validators/passageiroValidator.js';

export const criarPassageiro = async (req, res) => {
  const erros = validarPassageiro(req.body);
  if (erros.length) return res.status(400).json({ erros });

  const { nome, cpf, vooId } = req.body;
  try {
    // CPF único
    if (await Passageiro.findOne({ cpf })) {
      return res.status(400).json({ erro: 'CPF já cadastrado.' });
    }
    // Voo existe?
    const voo = await Voo.findById(vooId);
    if (!voo) return res.status(404).json({ erro: 'Voo não encontrado.' });

    const passageiro = await Passageiro.create({ nome, cpf, vooId });
    res.status(201).json(passageiro);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const listarPassageiros = async (req, res) => {
  const passageiros = await Passageiro.find().populate('vooId');
  res.json(passageiros);
};

export const atualizarPassageiro = async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, vooId } = req.body;
  try {
    const passageiro = await Passageiro.findById(id);
    if (!passageiro) return res.status(404).json({ erro: 'Passageiro não encontrado.' });

    // Se trocar CPF, verifica unicidade
    if (cpf && cpf !== passageiro.cpf) {
      if (await Passageiro.findOne({ cpf, _id: { $ne: id } })) {
        return res.status(400).json({ erro: 'CPF já cadastrado.' });
      }
      passageiro.cpf = cpf;
    }
    if (nome) passageiro.nome = nome;
    if (vooId) {
      // garante que o voo exista
      const novoVoo = await Voo.findById(vooId);
      if (!novoVoo) return res.status(404).json({ erro: 'Voo não encontrado.' });
      passageiro.vooId = vooId;
      // reseta check-in para pendente em novo voo
      passageiro.statusCheckin = 'pendente';
    }

    await passageiro.save();
    res.json(passageiro);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarCheckin = async (req, res) => {
  const { id } = req.params;
  try {
    const passageiro = await Passageiro.findById(id).populate('vooId');
    if (!passageiro) return res.status(404).json({ erro: 'Passageiro não encontrado.' });

    // só em voo com status "embarque"
    if (passageiro.vooId.status !== 'embarque') {
      return res.status(400).json({ erro: 'Check-in só permitido em voo com status "embarque".' });
    }
    passageiro.statusCheckin = 'realizado';
    await passageiro.save();
    res.json(passageiro);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const excluirPassageiro = async (req, res) => {
  const { id } = req.params;
  try {
    const p = await Passageiro.findByIdAndDelete(id);
    if (!p) return res.status(404).json({ erro: 'Passageiro não encontrado.' });
    res.json({ mensagem: 'Passageiro excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
