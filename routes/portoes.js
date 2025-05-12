import express from 'express';
import {
  criarPortao,
  listarPortoes,
  atualizarPortao,
  excluirPortao
} from '../controllers/portoesController.js';

const router = express.Router();

router.post('/', criarPortao);
router.get('/', listarPortoes);
router.put('/:id', atualizarPortao); // Rota para atualizar portão
router.delete('/:id', excluirPortao); // Rota para excluir portão

export default router;
