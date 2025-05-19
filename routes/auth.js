import express from 'express';
import { cadastrarFuncionario, login } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', cadastrarFuncionario);
router.post('/login', login);
export default router;