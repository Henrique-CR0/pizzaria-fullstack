// Model do Cliente: cria a tabela e faz as operacoes no banco (SQLite). - [Henrique]
const db = require('../db/database')

// Cria a tabela de clientes se ainda nao existir (roda quando o backend liga).
db.run(
    "CREATE TABLE IF NOT EXISTS clientes (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "nomeCompleto TEXT NOT NULL, " +
    "telefone TEXT, " +
    "cep TEXT, " +
    "endereco TEXT, " +
    "numero TEXT, " +
    "complemento TEXT, " +
    "bairro TEXT, " +
    "cidade TEXT, " +
    "estado TEXT, " +
    "pontoReferencia TEXT, " +
    "tipoEndereco TEXT" +
    ")",
    (err) => {
        if (err) {
            console.error('Erro ao criar tabela clientes:', err.message)
        } else {
            console.log('Tabela clientes criada')
        }
    }
)

// Busca um cliente pelo id.
function findClienteById(id, callback) {
    db.get('SELECT * FROM clientes WHERE id = ?', [id], (err, row) => {
        callback(err, row)
    })
}

// Lista todos os clientes.
function getClientes(callback) {
    db.all('SELECT * FROM clientes', [], (err, rows) => {
        callback(err, rows)
    })
}

// Cria um novo cliente a partir de um objeto com os campos.
function createCliente(cliente, callback) {
    const { nomeCompleto, telefone, cep, endereco, numero, complemento, bairro, cidade, estado, pontoReferencia, tipoEndereco } = cliente
    db.run(
        'INSERT INTO clientes (nomeCompleto, telefone, cep, endereco, numero, complemento, bairro, cidade, estado, pontoReferencia, tipoEndereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nomeCompleto, telefone, cep, endereco, numero, complemento, bairro, cidade, estado, pontoReferencia, tipoEndereco],
        (err) => {
            if (err) {
                console.error('Erro ao inserir cliente:', err.message)
                return callback(err)
            }
            callback(null, cliente)
        }
    )
}

// Deleta um cliente pelo id.
function deleteCliente(id, callback) {
    db.run('DELETE FROM clientes WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Erro ao deletar cliente:', err.message)
            return callback(err)
        }
        callback(null)
    })
}

// Atualiza um cliente existente pelo id.
function updateCliente(id, cliente, callback) {
    const { nomeCompleto, telefone, cep, endereco, numero, complemento, bairro, cidade, estado, pontoReferencia, tipoEndereco } = cliente
    db.run(
        'UPDATE clientes SET nomeCompleto = ?, telefone = ?, cep = ?, endereco = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?, pontoReferencia = ?, tipoEndereco = ? WHERE id = ?',
        [nomeCompleto, telefone, cep, endereco, numero, complemento, bairro, cidade, estado, pontoReferencia, tipoEndereco, id],
        (err) => {
            if (err) {
                console.error('Erro ao atualizar cliente:', err.message)
                return callback(err)
            }
            callback(null)
        }
    )
}

module.exports = { findClienteById, createCliente, getClientes, deleteCliente, updateCliente }