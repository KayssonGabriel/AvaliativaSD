export const validarPortao = ({ codigo, disponivel }) => {
  const erros = [];
  if (!codigo || typeof codigo !== 'string' || !codigo.trim()) {
    erros.push('Código do portão é obrigatório e deve ser uma string não vazia.');
  }
  if (disponivel !== undefined && typeof disponivel !== 'boolean') {
    erros.push('Disponível deve ser um valor booleano.');
  }
  return erros;
};
