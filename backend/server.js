// Ponto de partida do servidor (arquivo principal).
// Aqui montamos o Express, ligamos CORS, Swagger, as rotas e o banco.
// - [Equipe Pizzaria]

require('dotenv').config(); // carrega as variaveis do arquivo .env

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const sequelize = require('./src/config/database');
const swaggerSpec = require('./src/config/swagger');
// Importar os models garante que o Sequelize crie as tabelas no sync().
require('./src/models/User');
require('./src/models/Produto');

const authRoutes = require('./src/routes/authRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');

const app = express();
const PORTA = process.env.PORT || 3000;

// --- Configuracoes basicas (middlewares globais) ---

// CORS: permite que o frontend (rodando em outro endereco) acesse a API.
// Em producao voce pode restringir a origem; para o trabalho, liberar geral resolve.
app.use(cors());

// Faz o Express entender JSON no corpo das requisicoes.
app.use(express.json());

// --- Rotas ---

// Rota de teste, so para confirmar que a API esta no ar.
app.get('/', (req, res) => {
  res.json({ mensagem: 'API da Pizzaria no ar! Veja a documentacao em /api-docs' });
});

// Documentacao Swagger disponivel em /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas de autenticacao (cadastro, login, perfil)
app.use('/auth', authRoutes);

// Rotas de produtos (CRUD protegido por JWT)
app.use('/produtos', produtoRoutes);

// --- Inicializacao ---

// sequelize.sync() cria as tabelas no banco se ainda nao existirem.
sequelize
  .sync()
  .then(() => {
    console.log('Banco de dados conectado e tabelas sincronizadas.');
    app.listen(PORTA, () => {
      console.log(`Servidor rodando em http://localhost:${PORTA}`);
      console.log(`Documentacao Swagger em http://localhost:${PORTA}/api-docs`);
    });
  })
  .catch((erro) => {
    console.error('Erro ao conectar no banco:', erro);
  });
