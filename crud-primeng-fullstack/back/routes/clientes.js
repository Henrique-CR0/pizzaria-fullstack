// Rotas REST do Cliente, todas protegidas por JWT. - [Henrique]
var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/auth')
var { findClienteById, createCliente, getClientes, deleteCliente, updateCliente } = require('../models/clienteModel')

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 */
// LISTAR todos os clientes.
router.get('/', authenticateToken, function (req, res, next) {
  getClientes((err, clientes) => {
    if (err) {
      console.error('getClientes erro:', err.message)
      return res.status(500).json({ error: 'Erro ao buscar clientes' })
    }
    return res.status(200).json({ clientes: clientes })
  })
});

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Busca um cliente pelo ID
 *     tags: [Clientes]
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
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente nao encontrado
 */
// BUSCAR um cliente pelo id.
router.get('/:id', authenticateToken, function (req, res, next) {
  const id = req.params.id
  findClienteById(id, (err, cliente) => {
    if (err) {
      console.error('findClienteById erro:', err.message)
      return res.status(500).json({ error: 'Erro ao buscar cliente' })
    }
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente nao encontrado' })
    }
    return res.status(200).json({ cliente: cliente })
  })
});

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomeCompleto
 *             properties:
 *               nomeCompleto:
 *                 type: string
 *               telefone:
 *                 type: string
 *               cep:
 *                 type: string
 *               endereco:
 *                 type: string
 *               numero:
 *                 type: string
 *               complemento:
 *                 type: string
 *               bairro:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *               pontoReferencia:
 *                 type: string
 *               tipoEndereco:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       500:
 *         description: Erro interno ao salvar o cliente
 */
// CRIAR um novo cliente.
router.post('/', authenticateToken, function (req, res, next) {
  createCliente(req.body, (err, newCliente) => {
    if (err) {
      console.error('createCliente erro:', err.message)
      return res.status(500).json({ error: 'Erro ao salvar cliente' })
    }
    return res.status(201).json({ message: 'Cliente criado com sucesso', cliente: newCliente })
  })
});

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Deleta um cliente pelo ID
 *     tags: [Clientes]
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
 *         description: Cliente deletado com sucesso
 */
// DELETAR um cliente pelo id.
router.delete('/:id', authenticateToken, function (req, res) {
  const id = req.params.id
  deleteCliente(id, (err) => {
    if (err) {
      console.error('deleteCliente erro:', err.message)
      return res.status(500).json({ error: 'Erro ao deletar cliente' })
    }
    return res.status(200).json({ message: 'Cliente deletado com sucesso' })
  })
})

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente pelo ID
 *     tags: [Clientes]
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
 *         description: Cliente atualizado com sucesso
 */
// ATUALIZAR um cliente pelo id.
router.put('/:id', authenticateToken, function (req, res) {
  const id = req.params.id
  updateCliente(id, req.body, (err) => {
    if (err) {
      console.error('updateCliente erro:', err.message)
      return res.status(500).json({ error: 'Erro ao atualizar cliente' })
    }
    return res.status(200).json({ message: 'Cliente atualizado com sucesso' })
  })
})

module.exports = router;