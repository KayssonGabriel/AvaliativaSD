import express from 'express';
import { gerarRelatorio } from '../controllers/relatorioController.js';

const router = express.Router();

// GET /relatorio → gera o relatório conforme especificado
router.get('/', gerarRelatorio);

export default router;
