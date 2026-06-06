// Rotas REST do Pedido, protegidas por JWT.
var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/auth')
var { findPedidoById, createPedido, getPedidos, deletePedido, updatePedido } = require('../models/pedidoModel')

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 */
// LISTAR todos os pedidos.
router.get('/', authenticateToken, function (req, res, next) {
  getPedidos((err, pedidos) => {
    if (err) {
      console.error('getPedidos erro:', err.message)
      return res.status(500).json({ error: 'Erro ao buscar pedidos' })
    }
    return res.status(200).json({ pedidos: pedidos })
  })
});

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Busca um pedido pelo ID
 *     tags: [Pedidos]
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
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido nao encontrado
 */
// BUSCAR um pedido pelo id.
router.get('/:id', authenticateToken, function (req, res, next) {
  const id = req.params.id
  findPedidoById(id, (err, pedido) => {
    if (err) {
      console.error('findPedidoById erro:', err.message)
      return res.status(500).json({ error: 'Erro ao buscar pedido' })
    }
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido nao encontrado' })
    }
    return res.status(200).json({ pedido: pedido })
  })
});

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: integer
 *               clienteNome:
 *                 type: string
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *               total:
 *                 type: number
 *               status:
 *                 type: string
 *               data:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       500:
 *         description: Erro interno ao salvar o pedido
 */
// CRIAR um novo pedido.
router.post('/', authenticateToken, function (req, res, next) {
  createPedido(req.body, (err, newPedido) => {
    if (err) {
      console.error('createPedido erro:', err.message)
      return res.status(500).json({ error: 'Erro ao salvar pedido' })
    }
    return res.status(201).json({ message: 'Pedido criado com sucesso', pedido: newPedido })
  })
});

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Deleta um pedido pelo ID
 *     tags: [Pedidos]
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
 *         description: Pedido deletado com sucesso
 */
// DELETAR um pedido pelo id.
router.delete('/:id', authenticateToken, function (req, res) {
  const id = req.params.id
  deletePedido(id, (err) => {
    if (err) {
      console.error('deletePedido erro:', err.message)
      return res.status(500).json({ error: 'Erro ao deletar pedido' })
    }
    return res.status(200).json({ message: 'Pedido deletado com sucesso' })
  })
})

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza um pedido pelo ID
 *     tags: [Pedidos]
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
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 */
// ATUALIZAR um pedido pelo id.
router.put('/:id', authenticateToken, function (req, res) {
  const id = req.params.id
  updatePedido(id, req.body, (err) => {
    if (err) {
      console.error('updatePedido erro:', err.message)
      return res.status(500).json({ error: 'Erro ao atualizar pedido' })
    }
    return res.status(200).json({ message: 'Pedido atualizado com sucesso' })
  })
})

module.exports = router;