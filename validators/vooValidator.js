export const validarVoo = (voo) => {
  const erros = [];

  if (!voo.numeroVoo || typeof voo.numeroVoo !== 'string' || voo.numeroVoo.trim().length === 0) {
    erros.push('Número do voo é obrigatório e deve ser uma string não vazia.');
  }

  if (!voo.origem || typeof voo.origem !== 'string' || voo.origem.trim().length === 0) {
    erros.push('Origem é obrigatória e deve ser uma string não vazia.');
  }

  if (!voo.destino || typeof voo.destino !== 'string' || voo.destino.trim().length === 0) {
    erros.push('Destino é obrigatório e deve ser uma string não vazia.');
  }

  if (!voo.dataHoraPartida || isNaN(Date.parse(voo.dataHoraPartida))) {
    erros.push('Data e hora de partida são obrigatórias e devem ser uma data válida.');
  }

  if (!voo.portaoId || typeof voo.portaoId !== 'string') {
    erros.push('portaoId é obrigatório e deve ser uma string.');
  }

  return erros;
};