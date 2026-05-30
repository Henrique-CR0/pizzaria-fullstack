// Modelo "Usuario": representa a tabela de usuarios no banco.
// Cada propriedade aqui vira uma coluna na tabela.
// - [Equipe Pizzaria]

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // nao deixa cadastrar dois usuarios com o mesmo email
    validate: {
      isEmail: true, // valida se o texto tem formato de email
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false, // aqui guardamos a senha JA criptografada (nunca a senha pura)
  },
});

module.exports = Usuario;
