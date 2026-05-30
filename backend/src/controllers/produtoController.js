// Controller de Produtos: a logica das 5 operacoes do CRUD.
// LISTAR (read-all), BUSCAR (read-one), CRIAR, ATUALIZAR, DELETAR.
// Esse arquivo e o "molde": Clientes e Pedidos seguem a mesma estrutura. - [Equipe Pizzaria]

const Produto = require('../models/Produto');

// LISTAR todos os produtos
async function listar(req, res) {
  try {
    const produtos = await Produto.findAll({ order: [['id', 'ASC']] });
    res.json(produtos);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar produtos.', detalhe: erro.message });
  }
}

// BUSCAR um produto pelo id
async function buscarPorId(req, res) {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto nao encontrado.' });
    }
    res.json(produto);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar produto.', detalhe: erro.message });
  }
}

// CRIAR um novo produto
async function criar(req, res) {
  try {
    const { nome, descricao, preco, categoria } = req.body;

    if (!nome || preco == null || !categoria) {
      return res.status(400).json({ erro: 'Envie nome, preco e categoria.' });
    }

    const produto = await Produto.create({ nome, descricao, preco, categoria });
    res.status(201).json(produto);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar produto.', detalhe: erro.message });
  }
}

// ATUALIZAR um produto existente
async function atualizar(req, res) {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto nao encontrado.' });
    }

    const { nome, descricao, preco, categoria } = req.body;
    await produto.update({ nome, descricao, preco, categoria });
    res.json(produto);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar produto.', detalhe: erro.message });
  }
}

// DELETAR um produto
async function deletar(req, res) {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto nao encontrado.' });
    }

    await produto.destroy();
    res.json({ mensagem: 'Produto removido com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar produto.', detalhe: erro.message });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
