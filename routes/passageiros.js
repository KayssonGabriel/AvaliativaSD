import express from 'express';
import {
  criarPassageiro,
  listarPassageiros,
  atualizarCheckin,
  atualizarPassageiro,
  excluirPassageiro
} from '../controllers/passageirosController.js';

const router = express.Router();

router.post('/', criarPassageiro);
router.get('/', listarPassageiros);
router.patch('/:id/checkin', atualizarCheckin);
router.put('/:id', atualizarPassageiro);
router.delete('/:id', excluirPassageiro);

export default router;
