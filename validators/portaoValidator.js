export const validarPortao = (portao) => {
  const erros = [];

  if (!portao.codigo || typeof portao.codigo !== 'string' || portao.codigo.trim().length === 0) {
    erros.push('Código do portão é obrigatório e deve ser uma string não vazia.');
  }

  if (portao.disponivel !== undefined && typeof portao.disponivel !== 'boolean') {
    erros.push('Disponível deve ser um valor booleano.');
  }

  return erros;
};