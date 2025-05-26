# AvaliativaSD

API acadêmica de gerenciamento de aeroporto, desenvolvida em Node.js com Express e MongoDB. O serviço cadastra funcionários, portões, voos e passageiros, registra check-ins e reúne informações operacionais em um relatório.

Uma cópia de [`.env.example`](.env.example) serve de base para configurar o `.env` local.

## Estrutura

- [server.js](server.js) inicia o Express e registra as rotas.
- [db.js](db.js) estabelece a conexão com o MongoDB via Mongoose.
- [routes/](routes/) define os endpoints. [controllers/](controllers/) contém as regras de voos, portões, passageiros e relatórios.
- [models/](models/), [validators/](validators/) e [middleware/auth.js](middleware/auth.js) concentram persistência, validação de entrada e autenticação.

## Como executar

Com Node.js, npm e uma instância local do MongoDB, configure um arquivo `.env` na raiz com valores próprios para o ambiente:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/aeroporto
JWT_SECRET=SUBSTITUA_POR_UM_SEGREDO_LOCAL
PORT=3000
```

```bash
npm ci
npm start
```

A API escuta na porta `3000` por padrão e recebe corpos JSON. Use `POST /auth/register` para cadastrar um funcionário, `POST /auth/login` para obter o token e envie-o como `Authorization: Bearer <token>` nas rotas de portões, voos e passageiros.

| Caminho | Operações |
| --- | --- |
| `/portoes` | Criação e listagem. Atualização e exclusão usam `/:id`. Portões associados a voos retornam `409` na exclusão. |
| `/voos` | Criação e listagem. Atualização e exclusão usam `/:id`, e a alteração de situação usa `PATCH /voos/:id/status`. |
| `/passageiros` | Criação e listagem. Atualização e exclusão usam `/:id`, e o registro de check-in usa `PATCH /passageiros/:id/checkin`. |
| `/relatorio` | Consulta do relatório de voos e passageiros. |

## Enunciado

[Imagem da avaliação](descri%C3%A7%C3%A3o%20da%20avaliativa/Avaliativa.jpg).
