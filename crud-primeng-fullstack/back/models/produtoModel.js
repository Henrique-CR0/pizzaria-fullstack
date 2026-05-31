const db = require('../db/database')

// Cria a tabela de produtos se ainda nao existir - [Henrique]
db.run(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    categoria TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Erro ao criar tabela produtos:', err.message)
  } else {
    console.log('Tabela produtos criada')
  }
})

// Pegar produto pelo ID
function findProdutoById(id, callback){
    db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row)=>{
        callback(err, row)
    })
}

// Pegar todos os produtos
function getProdutos(callback){
    db.all('SELECT * FROM produtos', [], (err, rows)=>{
        callback(err, rows)
    })
}

// Criar um novo produto
function createProduto(nome, descricao, preco, categoria, callback){
    db.run(
        'INSERT INTO produtos (nome, descricao, preco, categoria) VALUES (?, ?, ?, ?)',
        [nome, descricao, preco, categoria],
        (err)=>{
            if(err){
                console.error('Erro ao inserir produto:', err.message)
                return callback(err)
            }
            const newProduto = { nome, descricao, preco, categoria }
            callback(null, newProduto)
        }
    )
}

// Deletar um produto
function deleteProduto(id, callback){
    db.run('DELETE FROM produtos WHERE id = ?', [id], (err)=>{
        if(err){
            console.error('Erro ao deletar produto:', err.message)
            return callback(err)
        }
        callback(null)
    })
}

// Atualizar um produto
function updateProduto(id, nome, descricao, preco, categoria, callback){
    db.run(
        'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, categoria = ? WHERE id = ?',
        [nome, descricao, preco, categoria, id],
        (err)=>{
            if(err){
                console.error('Erro ao atualizar produto:', err.message)
                return callback(err)
            }
            callback(null)
        }
    )
}

module.exports = { findProdutoById, createProduto, getProdutos, deleteProduto, updateProduto }