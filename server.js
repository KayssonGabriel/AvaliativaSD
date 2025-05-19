import express from 'express';
import authRoutes from './routes/auth.js';
import passageirosRoutes from './routes/passageiros.js';
import voosRoutes from './routes/voos.js';
import portoesRoutes from './routes/portoes.js';
import relatorioRoutes from './routes/relatorio.js';
import { proteger, autorizar } from './middleware/auth.js';

const app = express();
app.use(express.json());

// Rotas de Auth
app.use('/auth', authRoutes);

// Rotas protegidas para usuários autenticados
app.use('/portoes', proteger, portoesRoutes);
app.use('/voos', proteger, voosRoutes);
app.use('/passageiros', proteger, passageirosRoutes);

// Rotas de alteração restritas a admins
app.put('/portoes/:id', autorizar('admin'), portoesRoutes);
app.delete('/portoes/:id', autorizar('admin'), portoesRoutes);
app.put('/voos/:id', autorizar('admin'), voosRoutes);
app.patch('/voos/:id/status', autorizar('admin'), voosRoutes);
app.delete('/voos/:id', autorizar('admin'), voosRoutes);
app.put('/passageiros/:id', autorizar('admin'), passageirosRoutes);
app.patch('/passageiros/:id/checkin', autorizar('admin'), passageirosRoutes);
app.delete('/passageiros/:id', autorizar('admin'), passageirosRoutes);

// Rota de relatório sem proteção (se desejar)
app.use('/relatorio', relatorioRoutes);

export default app;
