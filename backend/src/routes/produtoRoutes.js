// Rotas de Produtos. Liga cada caminho a uma funcao do controller.
// IMPORTANTE: todas estao protegidas por JWT (router.use(autenticar)). - [Equipe Pizzaria]

const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const autenticar = require('../middleware/auth');

// Aplica o middleware de autenticacao em TODAS as rotas abaixo.
// Sem token valido, nenhuma delas funciona.
router.use(autenticar);

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: CRUD de pizzas, bebidas e sobremesas
 *
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: Pizza Margherita
 *         descricao:
 *           type: string
 *           example: Molho, mussarela e manjericao
 *         preco:
 *           type: number
 *           example: 39.90
 *         categoria:
 *           type: string
 *           example: Pizza
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', produtoController.listar);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo id
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto nao encontrado
 */
router.get('/:id', produtoController.buscarPorId);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado
 *       400:
 *         description: Dados invalidos
 */
router.post('/', produtoController.criar);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto nao encontrado
 */
router.put('/:id', produtoController.atualizar);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto removido
 *       404:
 *         description: Produto nao encontrado
 */
router.delete('/:id', produtoController.deletar);

module.exports = router;
