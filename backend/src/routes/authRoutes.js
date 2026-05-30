// Rotas de autenticacao.
// Aqui ligamos cada caminho (URL) a uma funcao do controller.
// Os comentarios "@swagger" geram a documentacao automatica.
// - [Equipe Pizzaria]

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const autenticar = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Autenticacao
 *   description: Cadastro, login e dados do usuario logado
 */

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Cadastra um novo usuario
 *     tags: [Autenticacao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Souza
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuario criado com sucesso
 *       400:
 *         description: Dados invalidos ou email ja cadastrado
 */
router.post('/registrar', authController.registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login e retorna um token JWT
 *     tags: [Autenticacao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado, retorna o token
 *       401:
 *         description: Email ou senha incorretos
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/perfil:
 *   get:
 *     summary: Retorna os dados do usuario logado (rota protegida)
 *     tags: [Autenticacao]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuario logado
 *       401:
 *         description: Token nao enviado ou invalido
 */
router.get('/perfil', autenticar, authController.perfil);

module.exports = router;
