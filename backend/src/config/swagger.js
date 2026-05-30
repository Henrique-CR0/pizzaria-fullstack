// Configuracao do Swagger (documentacao automatica da API).
// O swagger-jsdoc le os comentarios especiais "@swagger" que escrevemos
// nos arquivos de rotas e monta a documentacao sozinho.
// - [Equipe Pizzaria]

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Pizzaria',
      version: '1.0.0',
      description: 'Documentacao da API REST da Pizzaria (Fase 0: autenticacao JWT).',
    },
    // Define o esquema de seguranca "Bearer" (token JWT no cabecalho).
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Onde o Swagger deve procurar os comentarios de documentacao.
  apis: [require('path').join(__dirname, '..', 'routes', '*.js')],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
