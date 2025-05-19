import validator from 'validator';

export const validarPassageiro = ({ nome, cpf, vooId }) => {
  const erros = [];

  if (!nome || typeof nome !== 'string' || !nome.trim()) {
    erros.push('Nome é obrigatório e deve ser uma string não vazia.');
  }
  if (!cpf || !validator.isLength(cpf, { min: 11, max: 11 }) || !validator.isNumeric(cpf)) {
    erros.push('CPF deve ter 11 dígitos numéricos.');
  }
  if (!vooId || typeof vooId !== 'string') {
    erros.push('vooId é obrigatório e deve ser uma string.');
  }
  return erros;
};
