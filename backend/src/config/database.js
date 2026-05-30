// Conexao com o banco de dados usando Sequelize + SQLite.
// SQLite e um banco que fica salvo num unico arquivo (database.sqlite),
// otimo para aprender porque nao precisa instalar servidor de banco.
// - [Equipe Pizzaria]

const { Sequelize } = require('sequelize');
const path = require('path');

// Cria a instancia do Sequelize apontando para o arquivo do banco.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'database.sqlite'),
  logging: false, // deixe true se quiser ver os comandos SQL no terminal
});

module.exports = sequelize;
