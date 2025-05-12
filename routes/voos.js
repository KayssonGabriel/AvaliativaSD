import express from 'express';
import {
  criarVoo,
  listarVoos,
  atualizarStatusVoo,
  atualizarVoo,
  excluirVoo
} from '../controllers/voosController.js';

const router = express.Router();

router.post('/', criarVoo);
router.get('/', listarVoos);
router.patch('/:id/status', atualizarStatusVoo);
router.put('/:id', atualizarVoo);
router.delete('/:id', excluirVoo);

export default router;
