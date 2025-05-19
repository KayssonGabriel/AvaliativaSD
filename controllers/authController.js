import Funcionario from '../models/Funcionario.js';
import jwt from 'jsonwebtoken';
import { validarEmail } from '../validators/emailValidator.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const cadastrarFuncionario = async (req, res) => {
    const { nome, email, senha, cargo } = req.body;
    if (!validarEmail(email)) {
        return res.status(400).json({ erro: 'Email inválido.' });
    }
    try {
        if (await Funcionario.findOne({ email })) {
            return res.status(400).json({ erro: 'Email já cadastrado.' });
        }
        const func = await Funcionario.create({ nome, email, senha, cargo });
        res.status(201).json({ id: func._id, nome: func.nome, email: func.email, cargo: func.cargo });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const func = await Funcionario.findOne({ email });
        if (!func || !(await func.compararSenha(senha))) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' });
        }
        const token = jwt.sign(
            { id: func._id, nome: func.nome, cargo: func.cargo },
            JWT_SECRET,
            { expiresIn: '2m' }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
