// Pac Pizzaria - Model de Pedido no banco (itens em JSON) - Lucas Vieitez
// Model do Pedido: guarda o cliente, a lista de itens (em JSON) e o total.
const db = require('../db/database')

// Cria a tabela de pedidos se ainda nao existir.
db.run(
    "CREATE TABLE IF NOT EXISTS pedidos (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "clienteId INTEGER, " +
    "clienteNome TEXT, " +
    "itens TEXT, " +
    "total REAL, " +
    "status TEXT, " +
    "data TEXT" +
    ")",
    (err) => {
        if (err) {
            console.error('Erro ao criar tabela pedidos:', err.message)
        } else {
            console.log('Tabela pedidos criada')
        }
    }
)

// Transforma a linha do banco em objeto, convertendo 'itens' (texto) de volta em lista.
function montarPedido(row) {
    if (!row) return row
    let itens = []
    try {
        itens = row.itens ? JSON.parse(row.itens) : []
    } catch (e) {
        itens = []
    }
    return { ...row, itens }
}

// Busca um pedido pelo id.
function findPedidoById(id, callback) {
    db.get('SELECT * FROM pedidos WHERE id = ?', [id], (err, row) => {
        callback(err, montarPedido(row))
    })
}

// Lista todos os pedidos.
function getPedidos(callback) {
    db.all('SELECT * FROM pedidos', [], (err, rows) => {
        if (err) return callback(err)
        const pedidos = (rows || []).map(montarPedido)
        callback(null, pedidos)
    })
}

// Cria um pedido. A lista de itens vira texto JSON para caber no banco.
function createPedido(pedido, callback) {
    const itens = JSON.stringify(pedido.itens || [])
    db.run(
        'INSERT INTO pedidos (clienteId, clienteNome, itens, total, status, data) VALUES (?, ?, ?, ?, ?, ?)',
        [pedido.clienteId, pedido.clienteNome, itens, pedido.total, pedido.status, pedido.data],
        (err) => {
            if (err) {
                console.error('Erro ao inserir pedido:', err.message)
                return callback(err)
            }
            callback(null, pedido)
        }
    )
}

// Deleta um pedido pelo id.
function deletePedido(id, callback) {
    db.run('DELETE FROM pedidos WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Erro ao deletar pedido:', err.message)
            return callback(err)
        }
        callback(null)
    })
}

// Atualiza um pedido pelo id.
function updatePedido(id, pedido, callback) {
    const itens = JSON.stringify(pedido.itens || [])
    db.run(
        'UPDATE pedidos SET clienteId = ?, clienteNome = ?, itens = ?, total = ?, status = ?, data = ? WHERE id = ?',
        [pedido.clienteId, pedido.clienteNome, itens, pedido.total, pedido.status, pedido.data, id],
        (err) => {
            if (err) {
                console.error('Erro ao atualizar pedido:', err.message)
                return callback(err)
            }
            callback(null)
        }
    )
}

module.exports = { findPedidoById, createPedido, getPedidos, deletePedido, updatePedido }