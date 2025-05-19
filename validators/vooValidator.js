export const validarVoo = ({ numeroVoo, origem, destino, dataHoraPartida, portaoId }) => {
  const erros = [];
  if (!numeroVoo || typeof numeroVoo !== 'string' || !numeroVoo.trim()) {
    erros.push('Número do voo é obrigatório e deve ser uma string não vazia.');
  }
  if (!origem || typeof origem !== 'string' || !origem.trim()) {
    erros.push('Origem é obrigatória e deve ser uma string não vazia.');
  }
  if (!destino || typeof destino !== 'string' || !destino.trim()) {
    erros.push('Destino é obrigatório e deve ser uma string não vazia.');
  }
  if (!dataHoraPartida || isNaN(Date.parse(dataHoraPartida))) {
    erros.push('Data e hora de partida são obrigatórias e devem ser uma data válida.');
  }
  if (!portaoId || typeof portaoId !== 'string') {
    erros.push('portaoId é obrigatório e deve ser uma string.');
  }
  return erros;
};
