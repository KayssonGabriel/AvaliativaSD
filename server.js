import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import conectarBanco from './db.js';
import passageirosRoutes from './routes/passageiros.js';
import voosRoutes from './routes/voos.js';
import portoesRoutes from './routes/portoes.js';
import relatorioRoute from './relatorio.js';

const app = express();
conectarBanco();

app.use(express.json());

app.use('/passageiros', passageirosRoutes);
app.use('/voos', voosRoutes);
app.use('/portoes', portoesRoutes);
app.use('/relatorio', relatorioRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
