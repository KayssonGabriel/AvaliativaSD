import validator from 'validator';

export const validarPassageiro = (passageiro) => {
  const erros = [];

  if (!passageiro.nome || typeof passageiro.nome !== 'string' || passageiro.nome.trim().length === 0) {
    erros.push('Nome é obrigatório e deve ser uma string não vazia.');
  }

  if (!passageiro.cpf || !validator.isLength(passageiro.cpf, { min: 11, max: 11 }) || !validator.isNumeric(passageiro.cpf)) {
    erros.push('CPF deve ter 11 dígitos numéricos.');
  }

  if (!passageiro.vooId || typeof passageiro.vooId !== 'string') {
    erros.push('vooId é obrigatório e deve ser uma string.');
  }

  return erros;
};