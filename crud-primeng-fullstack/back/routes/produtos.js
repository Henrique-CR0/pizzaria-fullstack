var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/auth')
var { findProdutoById, createProduto, getProdutos, deleteProduto, updateProduto } = require('../models/produtoModel')

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
router.get('/', authenticateToken, function (req, res, next) {
  getProdutos((err, produtos) => {
    if (err) {
      console.error('getProdutos erro:', err.message)
      return res.status(500).json({ error: 'Erro ao buscar produtos' })
    }
    return res.status(200).json({ produtos: produtos })
  })
});

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - BearerAuth: []
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
router.get('/:id', authenticateToken, function (req, res, next) {
  const id = req.params.id
  findProdutoById(id, (err, produto) => {
    if (err) {
      console.error('findProdutoById erro:', err.message)
      return res.status(500).json({ error: 'Erro ao buscar produto' })
    }
    if (!produto) {
      return res.status(404).json({ error: 'Produto nao encontrado' })
    }
    return res.status(200).json({ produto: produto })
  })
});

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *               - categoria
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Pizza Margherita
 *               descricao:
 *                 type: string
 *                 example: Molho, mussarela e manjericao
 *               preco:
 *                 type: number
 *                 example: 39.90
 *               categoria:
 *                 type: string
 *                 example: Pizza
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       500:
 *         description: Erro interno ao salvar o produto
 */
router.post('/', authenticateToken, function (req, res, next) {
  const nome = req.body.nome
  const descricao = req.body.descricao
  const preco = req.body.preco
  const categoria = req.body.categoria

  createProduto(nome, descricao, preco, categoria, (err, newProduto) => {
    if (err) {
      console.error('createProduto erro:', err.message)
      return res.status(500).json({ error: 'Erro ao salvar produto' })
    }
    return res.status(201).json({ message: 'Produto criado com sucesso', produto: newProduto })
  })
});

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       500:
 *         description: Erro ao deletar produto
 */
router.delete('/:id', authenticateToken, function (req, res) {
  const id = req.params.id
  deleteProduto(id, (err) => {
    if (err) {
      console.error('deleteProduto erro:', err.message)
      return res.status(500).json({ error: 'Erro ao deletar produto' })
    }
    return res.status(200).json({ message: 'Produto deletado com sucesso' })
  })
})

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - BearerAuth: []
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
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Pizza Calabresa
 *               descricao:
 *                 type: string
 *                 example: Calabresa e cebola
 *               preco:
 *                 type: number
 *                 example: 45.00
 *               categoria:
 *                 type: string
 *                 example: Pizza
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar produto
 */
router.put('/:id', authenticateToken, function (req, res) {
  const id = req.params.id
  const { nome, descricao, preco, categoria } = req.body

  updateProduto(id, nome, descricao, preco, categoria, (err) => {
    if (err) {
      console.error('updateProduto erro:', err.message)
      return res.status(500).json({ error: 'Erro ao atualizar produto' })
    }
    return res.status(200).json({ message: 'Produto atualizado com sucesso' })
  })
})

module.exports = router;