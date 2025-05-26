// server.js
import express from 'express';
import dotenv from 'dotenv'; // Importa dotenv para carregar variáveis de ambiente
import conectarBanco from './db.js'; // Importa a função de conexão com o banco de dados

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Importa os módulos de rota
import authRoutes from './routes/auth.js';
import passageirosRoutes from './routes/passageiros.js';
import voosRoutes from './routes/voos.js';
import portoesRoutes from './routes/portoes.js';
import relatorioRoutes from './routes/relatorio.js';

// Importa o middleware de autenticação e autorização
import { proteger, autorizar } from './middleware/auth.js';

const app = express();
app.use(express.json()); // Middleware para analisar corpos de requisição JSON

// --- Conexão com o Banco de Dados ---
// Chama a função para conectar ao MongoDB quando o servidor é iniciado
conectarBanco();

// --- Rotas da API ---

// Rotas de autenticação (ex: /auth/register, /auth/login)
app.use('/auth', authRoutes);


app.use('/portoes', proteger, portoesRoutes);
app.use('/voos', proteger, voosRoutes);
app.use('/passageiros', proteger, passageirosRoutes);


app.put('/portoes/:id', proteger, autorizar('admin'), portoesRoutes);
app.delete('/portoes/:id', proteger, autorizar('admin'), portoesRoutes);
app.put('/voos/:id', proteger, autorizar('admin'), voosRoutes);
app.patch('/voos/:id/status', proteger, autorizar('admin'), voosRoutes);
app.delete('/voos/:id', proteger, autorizar('admin'), voosRoutes);
app.put('/passageiros/:id', proteger, autorizar('admin'), passageirosRoutes);
app.patch('/passageiros/:id/checkin', proteger, autorizar('admin'), passageirosRoutes);
app.delete('/passageiros/:id', proteger, autorizar('admin'), passageirosRoutes);

// Rota de relatório (sem proteção, se desejado)
app.use('/relatorio', relatorioRoutes);

// --- Inicialização do Servidor ---
const PORT = process.env.PORT || 3000; // Pega a porta do .env ou usa 3000 como padrão

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

